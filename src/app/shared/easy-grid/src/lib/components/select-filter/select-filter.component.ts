/*
 * This file is part of the Easy Grid Angular
 *
 * Copyright (c) 2019-2023, BRAC IT SERVICES LIMITED <http://www.bracits.com>
 *
 */

import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {IFilterAngularComp} from 'ag-grid-angular';
import {IDoesFilterPassParams, IFilterParams} from 'ag-grid-community';
import {isEmpty, isNotEmpty} from "../../helper/string-util";

@Component({
    selector: 'app-select-filter',
    templateUrl: './select-filter.component.html',
    styleUrls: ['./select-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectFilterComponent implements IFilterAngularComp {
    private params: IFilterParams | undefined;
    public selectedType = 'equals';
    public selectedValue = '';
    public filterOptions = ['equals'];

    public filterValues: any = [];

    constructor(private ref: ChangeDetectorRef) {
    }

    agInit(params: IFilterParams): void {
        this.params = params;
        if (params.colDef.filterParams.hasOwnProperty('filterValues')) {
            const filterValues1 = params.colDef.filterParams.filterValues;
            Object.keys(filterValues1).forEach(i => {
                this.filterValues.push({key: i, value: filterValues1[i]});
            });
        }
        if (params.colDef.cellDataType != "boolean" && params.colDef.filterParams.hasOwnProperty('filterOptions')) {
            this.filterOptions = params.colDef.filterParams.filterOptions;
        }

        if (this.filterOptions.length > 0) {
            this.selectedType = this.filterOptions[0];
        }
    }

    isFilterActive(): boolean {
        return this.selectedValue != null && this.selectedValue !== '';
    }

    doesFilterPass(params: IDoesFilterPassParams): boolean {
        if (!this.isFilterActive()) {
            return true;
        }
        // @ts-ignore
        const {column} = this.params;
        const {node} = params;
        const value = this.params?.getValue(node, column);

        return (value + '') == this.selectedValue;
    }

    getModel(): any {
        return isEmpty(this.selectedValue) ? undefined : {
            filterType: 'select', filter: this.selectedValue, type: this.selectedType
        };
    }

    setModel(model: any): void {
        this.selectedValue = model ? model.value : '';
        this.ref.markForCheck();
    }

    onTypeChange(): void {
        if (isNotEmpty(this.selectedValue)) {
            // @ts-ignore
            this.params.filterChangedCallback();
        }
    }

    onChange(): void {
        // @ts-ignore
        this.params.filterChangedCallback();
    }
}
