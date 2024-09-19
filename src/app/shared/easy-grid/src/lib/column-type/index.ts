/*
 * This file is part of the Easy Grid Angular
 *
 * Copyright (c) 2019-2023, BRAC IT SERVICES LIMITED <http://www.bracits.com>
 *
 */
import {ColDef} from 'ag-grid-community';
import {formatNumber} from "../helper/number-util";
// @ts-ignore
import dayjs from 'dayjs';

export const clientDateColumn: ColDef = {
    cellRendererParams: {
        viewFormat: 'DD/MM/YYYY'
    },
    filterParams: {
        debounceMs: 500,
        comparator(filterLocalDateAtMidnight: number, cellValue: null) {
            if (cellValue == null) {
                return 0;
            }

            const dateAtMidnight : any = dayjs(cellValue).startOf('day').toDate()

            if (dateAtMidnight < filterLocalDateAtMidnight) {
                return -1;
            } else if (dateAtMidnight > filterLocalDateAtMidnight) {
                return 1;
            }

            return 0;
        },
    },
    tooltipValueGetter(data) {
        if (data.value && data.colDef && 'cellRendererParams' in data.colDef && data.colDef.cellRendererParams.tooltipFormat) {
            return dayjs(data.value).format(data.colDef.cellRendererParams.tooltipFormat);
        }

        return '';
    },
    valueFormatter(data) {

        if (data.value && data.colDef) {
            return dayjs(data.value).format(data.colDef.cellRendererParams.viewFormat);
        }

        return '';
    }
};

export const amountColumn: ColDef = {
    cellClass: ['text-right'],
    headerClass: ['align-right'],
    valueFormatter(data) {
        return formatNumber(data.value);
    }
};

export const actionColumn: ColDef = {
    field: 'id',
    cellRenderer: 'actionCellRenderer',
    suppressNavigable: true,
    suppressSizeToFit: true,
    sortable: false,
    resizable: false,
    cellStyle: {overflow: 'visible'},
    headerName: 'Action'
};
