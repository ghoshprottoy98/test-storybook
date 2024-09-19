/*
 * This file is part of the bracIT Angular
 *
 * Copyright (c) 2019-2023, BRAC IT SERVICES LIMITED <http://www.bracits.com>
 *
 */
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Component, Inject, OnInit} from "@angular/core";
import {ColDef, GridApi} from "ag-grid-community";
import {GridAction} from "../../model/grid-action";
import {FormControl, Validators} from "@angular/forms";
import {getValueByKey, isNotEmpty} from "../../helper/string-util";

export interface NotificationDialogData {
    gridApi: GridApi,
    action: GridAction,
    rowSize?: number,
    defaultEmailBody?: string,
    emailLimit: number,
    smsLimit: number,
    defaultSmsBody?: string,
    defaultSubject?: string,
}

class NotificationActionMeta {
    constructor(private meta: any) {
    }

    getLabelKey(): string {
        return this.meta.recipientLabel ? this.meta.recipientLabel : this.meta.recipient;
    }
}

@Component({
    selector: 'app-notification-dialog-component',
    templateUrl: './app-notification-dialog-component.html',
    styleUrls: ['./style.scss'],
})
export class NotificationDialogComponent implements OnInit {

    body = new FormControl('', Validators.required);
    subject = new FormControl('', Validators.required);
    bodyPlaceHolder: string = 'Write content...';
    notificationType: string = 'Notification';
    rowSize: number = 10;
    recipients: string[] = [];
    maxLength: number = 160;
    byteCount = 0;

    constructor(@Inject(MAT_DIALOG_DATA) private data: NotificationDialogData,
                public dialogRef: MatDialogRef<NotificationDialogComponent>) {

    }

    ngOnInit(): void {
        this.rowSize = this.data.rowSize || 10;
        this.subject.setValue(this.data.defaultSubject || null);
        if (this.data.action.bulk?.type == 'email') {
            this.body.setValue(this.data.defaultEmailBody || '')
            this.maxLength = this.data.emailLimit;
        } else {
            this.body.setValue(this.data.defaultSmsBody || '')
            this.maxLength = this.data.smsLimit;
        }
        this.bodyPlaceHolder = `Write ${this.action.bulk?.type} content here...`;
        this.notificationType = this.action.bulk?.type == 'email' ? 'Email' : 'SMS';
        this.buildRecipientFromGrid();
        this.body.valueChanges.subscribe(x => {
            this.byteCount = x ? (new Blob([x + ''])).size : 0;
        })
    }

    private buildRecipientFromGrid() {
        if (this.action.bulk?.mode == 'id') {
            let recipientList: string[] = []
            let meta = new NotificationActionMeta(this.action.meta);
            this.api.getSelectedNodes().map(i => {
                recipientList.push(getValueByKey(i.data, meta.getLabelKey()))
            });

            if (recipientList.length > 0) {
                this.recipients = recipientList.filter(i => isNotEmpty(i));
            } else if (!this.action.bulk?.select_only) {
                this.recipients = [];
            }
        } else {
            this.recipients = [];
            this.recipients.push(...this.buildFiltersAsRecipients());
        }
    }

    private getFilterAsString(columnDef: ColDef | null, filterItem: any) {
        const typeString = this.getFilterType(filterItem.type);
        const valueString = this.getFilterValue(filterItem);
        switch (filterItem.filterType) {
            case 'date':
            case 'number':
                if(filterItem.type === 'inRange') {
                    return `"${columnDef?.headerName}" ${typeString} ${valueString}`;
                }
                return `"${columnDef?.headerName}" ${typeString} ${valueString}`;
            case 'select':
                const v = columnDef?.filterParams.filterValues[filterItem.filter] || filterItem.filter;
                return `"${columnDef?.headerName}" ${typeString} "${v}"`;
            default:
                return `"${columnDef?.headerName}" ${typeString} ${valueString}`;
        }
    }

    private getFilterType(type: string) {
        switch (type) {
            case 'blank':
                return 'is blank';
            case 'notBlank':
                return 'is not blank';
            case 'inRange':
                return 'between';
            case 'notEqual':
                return 'not equal';
            case 'lessThan':
                return 'less than';
            case 'lessThanOrEqual':
                return 'less than or equal';
            case 'greaterThan':
                return 'greater than'
            case 'greaterThanOrEqual':
                return 'greater than or equal'
            default:
                return type;
        }
    }

    private getFilterValue(filterItem: any) {
        switch (filterItem.type) {
            case 'inRange':
                return `"${filterItem.filter} and ${filterItem.filterTo}"`;
            case 'blank':
            case 'notBlank':
                return '';
            default:
                return `"${filterItem.filter}"`;

        }
    }

    private buildFiltersAsRecipients() {
        let filters: string[] = [];
        const filterModel = this.api.getFilterModel();

        Object.keys(filterModel).forEach(k => {
            const columnDef = this.api.getColumnDef(k);
            const filterItem = filterModel[k];
            filters.push(this.getFilterAsString(columnDef, filterItem))
        });

        return filters;
    }


    get api() {
        return this.data.gridApi;
    }

    get action() {
        return this.data.action;
    }

    onClose() {
        this.dialogRef.close(false);
    }

    get incomplete(): boolean {
        if (this.action.bulk?.type === 'email' && this.subject.value?.trim().length == 0) {
            return true;
        }

        return this.body.value?.trim().length == 0;
    }

    onSubmit() {
        this.dialogRef.close({
            body: this.body.getRawValue(),
            subject: this.subject.getRawValue()
        });
    }
}
