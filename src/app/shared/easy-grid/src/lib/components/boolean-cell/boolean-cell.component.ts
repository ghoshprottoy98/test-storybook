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
  selector: 'app-boolean-cell',
  templateUrl: './boolean-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooleanCellComponent implements AgRendererComponent {

  cellValue: boolean | undefined;

  hasData = false;

  yes = 'Yes';
  no = 'No';
  yesClass = 'badge-primary';
  noClass = 'badge-warning';

  constructor() {
  }

  agInit(params: any): void {

    if (params.data === undefined) {
      this.hasData = false;
      return;
    }

    this.hasData = true;

    if (params.hasOwnProperty('yes')) {
      this.yes = params.yes;
    }

    if (params.hasOwnProperty('no')) {
      this.no = params.no;
    }

    if (params.hasOwnProperty('yesClass')) {
      this.yesClass = params.yesClass;
    }

    if (params.hasOwnProperty('noClass')) {
      this.noClass = params.yesClass;
    }

    this.cellValue = this.getValueToDisplay(params);
  }

  refresh(params: ICellRendererParams): boolean {
    this.cellValue = this.getValueToDisplay(params);
    return false;
  }

  getValueToDisplay(params: ICellRendererParams) {
    let value = params.valueFormatted ? params.valueFormatted : params.value;
    return typeof value === 'boolean'? value : (value?.toLowerCase?.() === 'true');
  }
}
