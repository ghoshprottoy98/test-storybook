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
import {resolveRoute} from "../../helper/path-helper";

@Component({
  selector: 'app-link-cell',
  templateUrl: './link-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkCellComponent implements AgRendererComponent {
  label: string | undefined;
  node: any;
  href?: string;
  icon?: string;
  iconType?: string;
  target?: string;
  routerPath: string | undefined;
  link: string | undefined;
  routerParams: RouteParamHash | undefined;

  constructor() {
  }

  agInit(params: any): void {

    if (params.hasOwnProperty('routerPath')) {
      this.routerPath = params.routerPath;
    }

    if (params.hasOwnProperty('href')) {
      this.href = params.href;
    }

    if (params.hasOwnProperty('target')) {
      this.target = params.target;
    }

    if (params.hasOwnProperty('routerParams')) {
      this.routerParams = params.routerParams;
    }

    const data = params?.node?.data;

    if (params.hasOwnProperty('icon')) {
      this.icon = data?.[params.icon];
    }

    if (params.hasOwnProperty('iconType')) {
      this.iconType = data?.[params.iconType];
    }

    this.link = resolveRoute(this.routerPath+'', data, this.routerParams);
    this.label = this.getValueToDisplay(params);
    this.node = params?.node;
  }

  refresh(params: ICellRendererParams): boolean {
    this.label = this.getValueToDisplay(params);
    return false;
  }

  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }
}
