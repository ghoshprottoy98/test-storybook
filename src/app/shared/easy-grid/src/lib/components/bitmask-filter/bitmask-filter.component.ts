/*
 * This file is part of the Easy Grid Angular
 *
 * Copyright (c) 2019-2023, BRAC IT SERVICES LIMITED <http://www.bracits.com>
 *
 */

import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {IFilterAngularComp} from 'ag-grid-angular';
import {IDoesFilterPassParams, IFilterParams} from 'ag-grid-community';

@Component({
    selector: 'app-bitmask-filter',
    templateUrl: './bitmask-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BitmaskFilterComponent implements IFilterAngularComp {
    private params: IFilterParams | undefined;
    public selectedType = 'contains';
    public selectedValue: number = 0;

    public filterValues: any = [];
    public filterOptions = ['contains'];

    constructor(private ref: ChangeDetectorRef) {
    }

    agInit(params: IFilterParams): void {
        this.params = params;
        if (params.colDef.cellRendererParams.hasOwnProperty('filterValues')) {

            const fValues = params.colDef.filterParams.filterValues
                ? params.colDef.filterParams.filterValues : params.colDef.cellRendererParams.filterValues;

            Object.keys(fValues).forEach(i => {
                this.filterValues.push({key: i, value: fValues[i]});
            });
        }

        if (params.colDef.filterParams.hasOwnProperty('filterOptions')) {
            this.filterOptions = params.colDef.filterParams.filterOptions;
        }

        if (this.filterOptions.length > 0) {
            this.selectedType = this.filterOptions[0];
        }
    }

    isFilterActive(): boolean {
        return this.selectedValue != null && this.selectedValue > 0;
    }

    doesFilterPass(params: IDoesFilterPassParams): boolean {
        if (!this.isFilterActive()) {
            return true;
        }
        // @ts-ignore
        const {column} = this.params;
        const {node} = params;
        const value = this.params?.getValue(node, column);

        switch (this.selectedType) {
            case 'equals': return value == this.selectedValue;
            case 'notEquals': return value != this.selectedValue;
            case 'notContains': return (value & this.selectedValue) == 0;
            case 'contains': return (value & this.selectedValue) != 0;
        }

        return true;
    }

    getModel(): any {
        return !this.isFilterActive() ? undefined : {
            filterType: 'select', filter: this.selectedValue, type: this.selectedType
        };
    }

    setModel(model: any): void {
        this.selectedValue = model ? model.value : null;
        this.ref.markForCheck();
    }

    onTypeChange(): void {
        if (this.isFilterActive()) {
            // @ts-ignore
            this.params.filterChangedCallback();
        }
    }

    onChange(): void {
        // @ts-ignore
        this.params.filterChangedCallback();
    }
}
