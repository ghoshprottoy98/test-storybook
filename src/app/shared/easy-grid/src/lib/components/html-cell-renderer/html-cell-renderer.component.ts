/*
 * This file is part of the Easy Grid Angular
 *
 * Copyright (c) 2019-2023, BRAC IT SERVICES LIMITED <http://www.bracits.com>
 *
 */

import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AgRendererComponent} from 'ag-grid-angular';
import {ICellRendererParams} from 'ag-grid-community';

@Component({
  selector: 'app-html-cell-renderer',
  template: `
    <div [innerHTML]="cellValue"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HtmlCellRendererComponent implements AgRendererComponent{
  cellValue: string | undefined;
  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
  }

  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }
}
