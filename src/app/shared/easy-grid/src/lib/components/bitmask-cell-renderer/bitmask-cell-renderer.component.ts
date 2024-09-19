import { Component} from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {ICellRendererParams} from "ag-grid-community";

const getBitmask = (value: number, obj: { [x: string]: any; }) => {
  // @ts-ignore
  return Object.keys(obj).filter(key => (value & key) !== 0).map(key => obj[key]).join(', ');
}

@Component({
  selector: 'app-bitmask-cell-renderer',
  template: `{{cellValue}}`
})
export class BitmaskCellRendererComponent implements ICellRendererAngularComp {

  cellValue!: string;

  constructor() {
  }

  agInit(params: any): void {
    if(params.hasOwnProperty('filterValues')) {
      this.cellValue = getBitmask(params.value, params.filterValues);
    } else {
      this.cellValue = params.value
    }
  }

  refresh(params: ICellRendererParams<any>): boolean {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }
}
