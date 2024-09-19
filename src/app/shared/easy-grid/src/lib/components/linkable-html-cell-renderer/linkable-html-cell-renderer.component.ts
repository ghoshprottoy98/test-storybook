/*
 * This file is part of the Easy Grid Angular
 *
 * Copyright (c) 2019-2023, BRAC IT SERVICES LIMITED <http://www.bracits.com>
 *
 */

import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AgRendererComponent} from 'ag-grid-angular';
import {ICellRendererParams} from 'ag-grid-community';
import {RouteParamHash} from '../../model/grid-action';
import {getValueByKey} from "../../helper/string-util";
import {resolveRoute} from "../../helper/path-helper";

@Component({
    selector: 'app-linkable-html-cell-renderer',
    template: `
        <div class="mt-0">
            <div class="text-dark-75 line-height-sm">{{cellValue}}</div>
            <a [routerLink]="link"><span class="font-size-sm text-primary kt-link">{{label}}</span></a>
        </div>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkableHtmlCellRendererComponent implements AgRendererComponent {
    cellValue: string | undefined;
    routerPath: string | undefined;
    link: string | undefined;
    label: string | undefined;
    routerParams: RouteParamHash | undefined;
    column: string | undefined;

    agInit(params: any): void {
        this.cellValue = this.getValueToDisplay(params);
        if (params.hasOwnProperty('routerPath')) {
            this.routerPath = params.routerPath;
        }

        if (params.hasOwnProperty('routerParams')) {
            this.routerParams = params.routerParams;
        }
        if (params.hasOwnProperty('column')) {
            this.column = params.column;
        }

        const data = params?.node?.data;
        if (typeof data !== 'undefined' && typeof this.column !== 'undefined') {
            this.label = getValueByKey(data, this.column);
            this.cellValue = this.getValueToDisplay(params);
            this.link = resolveRoute(this.routerPath + '', data, this.routerParams);
        }
    }

    getValueToDisplay(params: ICellRendererParams) {
        return params.valueFormatted ? params.valueFormatted : params.value;
    }

    refresh(params: ICellRendererParams): boolean {
        return false;
    }
}
