/*
 * This file is part of the Easy Grid Angular
 *
 * Copyright (c) 2019-2023, BRAC IT SERVICES LIMITED <http://www.bracits.com>
 *
 */

import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {MatDialog} from "@angular/material/dialog";
import {AgGridAngular} from 'ag-grid-angular';
import {ActionRendererComponent} from './components/action-renderer/action-renderer.component';
import {actionColumn, amountColumn, clientDateColumn} from './column-type';
import {BooleanCellComponent} from './components/boolean-cell/boolean-cell.component';
import {
    ColDef,
    FirstDataRenderedEvent,
    GridApi,
    GridOptions, GridPreDestroyedEvent,
    RowClassParams,
    RowModelType,
    SelectionChangedEvent
} from 'ag-grid-community';
import {LinkCellComponent} from './components/link-cell/link-cell.component';
import {SelectFilterComponent} from './components/select-filter/select-filter.component';
import {stringify} from 'qs';
import {HtmlCellRendererComponent} from './components/html-cell-renderer/html-cell-renderer.component';
import {
    LinkableHtmlCellRendererComponent
} from './components/linkable-html-cell-renderer/linkable-html-cell-renderer.component';
import {ImageCellRendererComponent} from './components/image-cell-renderer/image-cell-renderer.component';
import {ToggleCellEditorComponent} from "./components/boolean-cell/toogle-cell-editor";
import {isEmpty, isNotEmpty} from "./helper/string-util";
import {firstValueFrom, map, Observable, of, throwError} from "rxjs";
import {GridAction} from "./model/grid-action";
import {NotificationDialogComponent} from "./components/notification/notification-dialog.component";
import {BitmaskCellRendererComponent} from "./components/bitmask-cell-renderer/bitmask-cell-renderer.component";
import {BitmaskFilterComponent} from "./components/bitmask-filter/bitmask-filter.component";
import {StateStorageInterface} from "./services/state-storage-interface";
import {InMemorySateStorageService} from "./services/in-memory-sate-storage.service";

type ColumnsToFitType = 'size' | 'all' | 'skipHeader' | false;
type RowSelection = 'single' | 'multiple' | undefined;

interface FileSaverService {
    save(data: Blob, filename: string, type?: string): any
}

@Component({
    selector: 'app-easy-grid',
    templateUrl: './easy-grid.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EasyGridComponent implements OnInit, OnDestroy {

    @ViewChild('agGrid') agGrid!: AgGridAngular;

    private bodyEl: HTMLElement | null | undefined;

    private gridApi!: GridApi;
    public dataSource!: any;

    defaultColDef: ColDef = {
        resizable: true,
        sortable: true,
        filterParams: {
            maxNumConditions: 1,
        },
        unSortIcon: true,
        icons: {
            sortUnSort: '<i class="fa fa-sort"/>',
            sortAscending: '<i class="fa fa-sort-alpha-up"/>',
            sortDescending: '<i class="fa fa-sort-alpha-down"/>'
        }
    };

    components = {
        actionCellRenderer: ActionRendererComponent,
        bitmaskCellRenderer: BitmaskCellRendererComponent,
        booleanCellRenderer: BooleanCellComponent,
        toggleCellEditor: ToggleCellEditorComponent,
        linkCellRenderer: LinkCellComponent,
        selectFilter: SelectFilterComponent,
        bitmaskFilter: BitmaskFilterComponent,
        htmlCellRenderer: HtmlCellRendererComponent,
        linkableHtmlCellRenderer: LinkableHtmlCellRendererComponent,
        imageCellRenderer: ImageCellRendererComponent,
    };

    rowBuffer = 0;

    rowModelType: RowModelType = 'infinite';
    // how big each page in our page cache will be, default is 100
    cacheBlockSize = 30;

    paginationPageSizeSelector: number[] | boolean = [10, 20, 50, 100];
    paginationPageSize = 10;
    // how many extra blank rows to display to the user at the end of the dataset,
    // which sets the vertical scroll and then allows the grid to request viewing more rows of data.
    // default is 1, ie show 1 row.
    cacheOverflowSize = 10;
    maxConcurrentDatasourceRequests = 1;
    infiniteInitialRowCount = 1;
    maxBlocksInCache = 4;
    suppressCellSelection = true;
    suppressMenuHide = true;
    enableCellTextSelection = false;
    columnTypes = {
        amountColumn,
        actionColumn,
        clientDateColumn
    };

    bulkActions: any[] = [];

    hasFilter = false;
    initialState: any;

    @Input() getRowClass: ((params: RowClassParams<any>) => string | string[] | undefined) | undefined = undefined;
    @Input() rowClassRules = {};
    @Input() pagination = true;
    @Input() stateKey?: string;
    @Input() stateStorage?: StateStorageInterface;
    @Input() paginationAutoPageSize = false;
    @Input() frameworkComponents: any;
    @Input() height = 'auto';
    @Input() offset = 210;
    @Input() defUrl: string | undefined;
    @Input() autoSizeColumnsToFit: ColumnsToFitType = false;
    @Input() dataUrl: string | undefined;
    @Input() idsUrl: string | undefined;
    @Input() exportFileName: string | undefined;
    @Input() identityColumn = 'id';
    @Input() rowData: any[] | undefined;
    @Input() rowHeight: any;
    @Input() columnDefs: ColDef[] | undefined;
    @Input() suppressAutoHeight = false;
    @Input() rowSelection: RowSelection = undefined;
    @Input() stopEditingWhenCellsLoseFocus = true;
    @Input() singleClickEdit = false;
    @Input() suppressPaginationPanel = false;
    @Input() disableServerCount = true;
    @Input() maxSelectionCount: number | undefined = undefined;
    @Input() fileSaverService: FileSaverService | undefined;
    @Input() beforeBulkAction: (action: GridAction) => Promise<any> = () => Promise.resolve()
    @Input() alwaysShowHorizontalScroll: boolean = false
    @Input() gridOptions: GridOptions | undefined;
    @Input() notificationRowSize: number | undefined;
    @Input() notificationEmailBody: string | undefined;
    @Input() emailMaxLength: number = 5000;
    @Input() notificationSmsBody: string | undefined;
    @Input() smsMaxLength: number = 160;
    @Input() notificationSubject: string | undefined;

    @Output() onBulkAction = new EventEmitter<{ action: GridAction, data: any, success: boolean }>();
    @Output() actionClicked = new EventEmitter<{ id: string, node: any }>();
    @Output() cellValueChanged = new EventEmitter<any>();
    @Output() ready = new EventEmitter<any>();
    @Output() refreshClicked = new EventEmitter<any>();

    gridNameRegx = /[.]*\/data\/grid\/([\w+-]*)/

    private initialColumnSizeState: string | boolean | undefined

    totalRecord: number = 0;
    selectedCount: number = 0;
    bulkActionUrl: string | undefined;

    constructor(private http: HttpClient, private cdr: ChangeDetectorRef,
                private dialog: MatDialog, private mapStorage: InMemorySateStorageService) {
    }

    ngOnInit(): void {
        this.registerPreDestroyHandler()
        this.restoreSavedState();
        this.bodyEl = document.getElementById('kt_app_body')

        if (isEmpty(this.dataUrl) && null !== this.columnDefs) {
            this.rowModelType = 'clientSide';
            this.initColumnDefs(this.columnDefs);
        } else if (null !== this.columnDefs) {
            this.initColumnDefs(this.columnDefs);
        }

        if (isNotEmpty(this.dataUrl)) {
            this.dataSource = this.getServerSideDataSource();
        }

        this.autoHeight();
        this.initialColumnSizeState = this.autoSizeColumnsToFit;
    }

    private autoHeight() {
        if (!this.suppressAutoHeight) {
            let smallOffset = document.documentElement.clientWidth <= 991 ? 50 : 0;
            this.height = (document.documentElement.clientHeight - this.offset + smallOffset) + 'px';
            this.bodyEl?.setAttribute('data-kt-grid-auto-height', 'true');
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: Event) {
        this.autoHeight();
        this.autoColumnsSize();
    }

    onGridReady(params: any) {
        this.gridApi = params.api;
        this.gridApi.setGridOption('enableCellTextSelection', true);

        if (isNotEmpty(this.dataUrl)) {
            this.buildRelativeUrls(this.dataUrl as string);
        }

        if (isNotEmpty(this.defUrl)) {
            const subs = this.http
                .get(this.defUrl + '', {
                    headers: new HttpHeaders({'no-loader': 'true'})
                })
                .subscribe({
                    next: (defs: any) => {
                        this.columnDefs = defs.columns;
                        this.initColumnDefs(defs.columns);
                        this.mergeOptions(defs.options)
                        subs.unsubscribe();
                    }
                });
        }

        this.ready.emit(params.api);
    }

    private buildRelativeUrls(dataUrl: string) {
        const parts = dataUrl.split('?');
        const baseUrl = parts[0];
        const queryParam = (parts.length > 1 ? '?' + parts.slice(1).join('?') : '');

        if (isEmpty(this.defUrl) && this.columnDefs == undefined) {
            this.defUrl = baseUrl + '/def' + queryParam;
        }

        if (isEmpty(this.idsUrl)) {
            this.idsUrl = baseUrl + '/ids' + queryParam;
        }

        if (isEmpty(this.exportFileName)) {
            const matches = dataUrl.match(this.gridNameRegx)
            this.exportFileName = matches ? matches[1] : undefined;
        }

        this.bulkActionUrl = baseUrl + '/bulk-action/:ACTION_SLUG' + queryParam;
    }

    private isClientSideAvailable(limit?: number) {
        if (!this.disableServerCount) {
            return false;
        }

        if (this.api.paginationGetTotalPages() === 1) {
            return true;
        }

        return this.api.paginationGetCurrentPage() === 0 && (!limit || limit <= this.cacheBlockSize);

    }

    private getIdFromClientSide(limit?: number): { ids: any[], total: number } {
        const data = {
            ids: [],
            total: this.api.paginationGetRowCount()
        };

        if (this.api.paginationGetRowCount() === 0) {
            return data;
        }

        const max = limit || this.cacheBlockSize;

        this.api.forEachNode((node: any, index) => {
            if (index < max) {
                // @ts-ignore
                data.ids.push(node.data[this.identityColumn]);
            }
        });

        return data;
    }

    public getFilteredIds(limit?: number): Observable<{ ids: any[], total: number }> {

        if (this.rowModelType == 'clientSide') {
            return of(this.getAllFilteredIds(limit));
        }

        if (this.isClientSideAvailable(limit)) {
            return of(this.getIdFromClientSide(limit));
        }

        if (this.idsUrl === undefined) {
            return throwError(() => new Error('EasyGridComponent::idsUrl not configured'))
        }

        return this.http.get<any>(this.idsUrl, {params: this.buildParamsForFilteredIds(limit)}).pipe(
            map((result: { ids: any[], total: number }) => {
                if (this.disableServerCount) {
                    result.total = this.api.paginationGetRowCount();
                }
                return result;
            })
        );
    }

    private buildParamsForFilteredIds(limit?: number) {

        const param = {
            limit,
            count: !this.disableServerCount,
            ...this.buildSortAndFilterParams()
        };

        return new HttpParams({fromString: stringify(param)});
    }

    private buildParamsForBulkAction() {
        return new HttpParams({fromString: stringify(this.buildSortAndFilterParams())});
    }

    private buildSortAndFilterParams() {
        const colState = this.api.getColumnState();
        const sortState = colState
            .filter((s) => s.sort != null)
            .map((s) => ({colId: s.colId, sort: s.sort, sortIndex: s.sortIndex}));

        return {
            sort: sortState,
            filter: this.api.getFilterModel()
        };
    }

    private getServerSideDataSource() {
        const dataSource = {
            rowCount: undefined,
            getRows: (p: { startRow: number; endRow: number; sortModel: any; filterModel: any; successCallback: (arg0: any, arg1: any) => void; }) => {
                const param = {
                    offset: p.startRow,
                    limit: p.endRow - p.startRow,
                    sort: p.sortModel,
                    filter: p.filterModel
                };

                const httpParams = new HttpParams({fromString: stringify(param)});

                this.api.showLoadingOverlay();

                const subs = this.http
                    .get(this.dataUrl + '', {params: httpParams})
                    .subscribe((result: any) => {
                        p.successCallback(result.rows, result.lastRow);
                        this.totalRecord = result.lastRow;
                        this.selectedCount = this.api.getSelectedRows().length
                        if (this.gridApi) {
                            this.autoColumnsSize();
                            this.api.hideOverlay();
                        }
                        subs.unsubscribe();
                    });
            }
        };
        return dataSource;
    }

    autoColumnsSize() {
        switch (this.autoSizeColumnsToFit) {
            case 'size':
                this.gridApi.sizeColumnsToFit();
                break;
            case "all":
                this.gridApi.autoSizeAllColumns(false);
                break;
            case "skipHeader":
                this.gridApi.autoSizeAllColumns(true);
                break;
        }
    }

    autoSizeAllColumnSkippingHeader() {
        this.autoSizeColumnsToFit = 'skipHeader';
        this.autoColumnsSize();
    }

    autoSizeAllColumn() {
        this.autoSizeColumnsToFit = 'all';
        this.autoColumnsSize();
    }

    columnToFitSize() {
        this.autoSizeColumnsToFit = 'size';
        this.autoColumnsSize();
    }

    resetColumnSizeState(): void {
        this.autoSizeColumnsToFit = this.initialColumnSizeState as ColumnsToFitType;
        this.autoColumnsSize();
    }

    refresh() {
        if (this.rowModelType === 'infinite') {
            this.api.purgeInfiniteCache();
        }

        this.refreshClicked.emit()
    }

    get grid() {
        return this.agGrid;
    }

    get api() {
        return this.gridApi;
    }

    ngOnDestroy(): void {
        this.bodyEl?.removeAttribute('data-kt-grid-auto-height');
    }

    private initColumnDefs(defs: ColDef[] | undefined) {
        defs && defs.forEach((item: ColDef) => {
            if (item.colId === '__action') {
                this.bulkActions = item.cellRendererParams.actions.filter((m: { bulk: any; }) => m.bulk);
                item.cellRendererParams.click = (id: any, node: any) => {
                    this.actionClicked.emit({id, node});
                };
            }
            if (item.editable) {
                item.onCellValueChanged = (event) => {
                    this.cellValueChanged.emit(event);
                };
            }
        });

        if (this.gridApi && defs) {
            this.gridApi.setGridOption('columnDefs', defs);
        }
    }

    onFilterChanged($event: any) {
        this.hasFilter = Object.keys($event.api.getFilterModel()).length > 0;
    }

    resetFilter() {
        if (!this.hasFilter) {
            return;
        }
        this.api.setFilterModel(null);
    }

    setRowData(data: any[]) {
        if (this.rowModelType != 'clientSide') {
            throw new Error('setting Row data allowed only for client side grid.');
        }

        this.api.setGridOption('rowData', data);
        this.totalRecord = data.length;
    }

    onFirstDataRendered($event: FirstDataRenderedEvent<any>) {
        this.autoColumnsSize();
        this.updateTotalCount();
    }

    private updateTotalCount() {
        if (this.rowModelType != 'clientSide') {
            return;
        }

        this.totalRecord = this.api.paginationGetRowCount();
    }

    private mergeOptions(options: any) {
        let hasOption = false;
        if (this.rowSelection === undefined && options.hasOwnProperty('rowSelection')) {
            this.rowSelection = options.rowSelection as RowSelection;
            hasOption = true;
        }

        if (options.hasOwnProperty('maxSelectionCount')) {
            let hardLimit = options.maxSelectionCount as number;
            this.maxSelectionCount = Math.min(this.maxSelectionCount || Infinity, hardLimit);
            hasOption = true;
        }

        if (options.hasOwnProperty('cacheBlockSize')) {
            this.cacheBlockSize = options.cacheBlockSize as number
            hasOption = true;
        }

        if (options.hasOwnProperty('identityColumn')) {
            this.identityColumn = options.identityColumn
        }

        if (options.hasOwnProperty('paginationAutoPageSize')) {
            this.paginationAutoPageSize = options.paginationAutoPageSize as boolean
            hasOption = true;
        }

        if (options.hasOwnProperty('autoSizeColumnsToFit')) {
            this.autoSizeColumnsToFit = options.autoSizeColumnsToFit as ColumnsToFitType
            this.initialColumnSizeState = this.autoSizeColumnsToFit;
            hasOption = true;
        }

        if (hasOption) {
            this.cdr.markForCheck()
        }
    }

    async onBulkActionClicked(action: GridAction) {
        try {
            const res = await this.beforeBulkAction(action)
            const notifResponse = await this.handleNotificationInput(action, res)
            return this.handleBulkAction(action, notifResponse)
        } catch (error) {
            if (error) {
                this.onBulkAction.emit({action, data: error, success: false});
            }
        }
    }

    onSelectionChanged($event: SelectionChangedEvent<any>) {
        this.selectedCount = $event.api.getSelectedRows().length
    }

    private async handleActionById(action: GridAction, extra: any) {
        let selectedRows = this.getSelectedIds();

        let ids$: Observable<any>;

        if (action.bulk?.select_only || selectedRows.length > 0) {
            ids$ = of({ids: selectedRows, total: selectedRows.length})
        } else {
            ids$ = this.getFilteredIds(this.maxSelectionCount);
        }

        ids$.subscribe({
            next: async (data) => {
                if (action.bulk?.url) {
                    try {
                        const url = this.getUrl(action);
                        const response = await firstValueFrom(this.http.post<any>(url, {ids: data.ids, ...extra}));
                        this.onBulkAction.emit({action, data: response, success: true});
                    } catch (error) {
                        // Handle error if the HTTP request fails
                        this.onBulkAction.emit({action, data: error, success: false});
                    }
                } else {
                    this.onBulkAction.emit({action, data, success: true});
                }
            }
        });
    }

    private getUrl(action: GridAction): string {
        if (action.bulk?.url !== true && action.bulk?.url) {
            return action.bulk?.url || '';
        }

        return this.bulkActionUrl?.replace(':ACTION_SLUG', action.id) || '';
    }

    private getSelectedIds() {
        return this.api.getSelectedRows().map(d => d[this.identityColumn])
    }

    private async handleActionByFilter(action: GridAction, extra: any) {
        let url = this.getUrl(action);
        let fileName;
        const params = this.buildParamsForBulkAction()
        let options: any = {params}
        let response: any = {action, success: false}

        if (action.bulk?.blob) {
            options = {params, responseType: 'blob'};
            fileName = this.exportFileName + '.' + action.bulk?.type
            response = {action, fileName, success: true}
        }

        try {
            const data = await firstValueFrom(this.http.post<any>(url, {...extra}, options));
            if (this.fileSaverService !== undefined && data instanceof Blob && fileName) {
                this.fileSaverService.save(data, fileName, action.bulk?.type);
            } else {
                response = {action, success: true}
            }
            this.onBulkAction.emit({...response, data})
        } catch (e) {
            this.onBulkAction.emit({...response, data: e})
        }
    }

    private async handleBulkAction(action: GridAction, extra: any) {
        if (action.bulk?.mode === 'filter') {
            return this.handleActionByFilter(action, extra)
        } else {
            return this.handleActionById(action, extra)
        }
    }

    private async handleNotificationInput(action: GridAction, res: any) {

        if (action.bulk?.mode === 'filter' && this.gridApi.paginationGetRowCount() > (this.maxSelectionCount || Infinity)) {
            return Promise.reject(`Max ${this.maxSelectionCount} Records are allowed! Please Chose some filter to reduce your record set!`); // Block down streem processing
        }

        if (!['sms', 'email'].includes(action.bulk?.type || 'wrong')) {
            return Promise.resolve(res);
        }

        const dialogRef = this.dialog.open(NotificationDialogComponent, {
            width: '100%',
            data: {
                rowSize: this.notificationRowSize,
                defaultEmailBody: this.notificationEmailBody,
                emailLimit: this.emailMaxLength,
                defaultSmsBody: this.notificationSmsBody,
                smsLimit: this.smsMaxLength,
                defaultSubject: this.notificationSubject,
                gridApi: this.gridApi,
                action
            }
        });
        return new Promise((resolve, reject) => {
            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    resolve({...result, ...res});
                } else {
                    reject();
                }
            });
        });
    }

    private getAllFilteredIds(limit: number | undefined) {
        const data = {
            ids: [],
            total: this.api.paginationGetRowCount()
        };

        const max = limit || Infinity;

        this.api.forEachNodeAfterFilterAndSort((node: any, index) => {
            if (index < max) {
                // @ts-ignore
                data.ids.push(node.data[this.identityColumn]);
            }
        });

        return data;
    }

    private getStateStore(): StateStorageInterface {
        return this.stateStorage ? this.stateStorage : this.mapStorage;
    }

    private onPreDestroyed(params: GridPreDestroyedEvent<any>) {
        if (this.stateKey) {
            this.getStateStore().setState(this.stateKey, params.state);
        }
    }

    private restoreSavedState() {
        if (!this.stateKey || isEmpty(this.stateKey)) {
            return;
        }

        this.getStateStore().getState(this.stateKey).then(state => {
            if (state?.pagination?.page > 0) {
                this.infiniteInitialRowCount = (state.pagination.page + 1) * state.pagination.pageSize
            }

            if (state) {
                this.initialState = state;
            }
        });
    }

    private registerPreDestroyHandler() {
        if (!this.stateKey) { //No need for register
            return;
        }

        if (!this.gridOptions) {
            this.gridOptions = {
                onGridPreDestroyed: p => this.onPreDestroyed(p)
            }
            return;
        }

        let preDestroyHandler = this.gridOptions.onGridPreDestroyed;

        this.gridOptions.onGridPreDestroyed = p => {
            if (typeof preDestroyHandler == 'function') {
                preDestroyHandler.call(null, p);
                this.onPreDestroyed(p);
            }
        }
    }
}
