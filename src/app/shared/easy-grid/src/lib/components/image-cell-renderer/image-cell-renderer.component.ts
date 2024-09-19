/*
 * This file is part of the Easy Grid Angular
 *
 * Copyright (c) 2019-2023, BRAC IT SERVICES LIMITED <http://www.bracits.com>
 *
 */

import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ICellRendererParams} from 'ag-grid-community';
import {AgRendererComponent} from 'ag-grid-angular';

@Component({
    selector: 'app-image-cell-renderer',
    template: `<img class="rounded-circle z-depth-2" style="height: 50px" alt="" src="{{imgSrc }}" />`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageCellRendererComponent implements AgRendererComponent {
    imgSrc: string | undefined;

    constructor() {
    }

    agInit(params: any): void {
        const data = params?.node?.data;
        if (typeof data !== 'undefined') {
            const path = this.getValueToDisplay(params);
            this.imgSrc = `/media/avatar/bucket/${path}`;
        }
    }

    getValueToDisplay(params: ICellRendererParams) {
        return params.valueFormatted ? params.valueFormatted : params.value;
    }

    refresh(params: ICellRendererParams): boolean {
        return false;
    }
}
