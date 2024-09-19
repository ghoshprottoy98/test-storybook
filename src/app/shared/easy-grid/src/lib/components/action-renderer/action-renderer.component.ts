/*
 * This file is part of the Easy Grid Angular
 *
 * Copyright (c) 2019-2023, BRAC IT SERVICES LIMITED <http://www.bracits.com>
 *
 */

import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AgRendererComponent} from 'ag-grid-angular';
import {GridAction} from '../../model/grid-action';
import {titleToId} from "../../helper/string-util";

@Component({
  selector: 'app-action-renderer',
  templateUrl: './action-renderer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionRendererComponent implements AgRendererComponent {

  node: any;
  actions: GridAction[] = [];
  menu = false;
  activeCount = 0;
  private action = (id: string, node: any) => {};

  constructor() {
  }

  agInit(params: any): void {
    if (params.node.rowPinned) {
      return;
    }

    this.node = params?.node;

    if (params.hasOwnProperty('actions')) {
      this.actions = params.actions;
      if (typeof params.click === 'function') {
        this.action = params.click;
      }
      this.initAllActionAttributes();
    }

    this.menu = params.hasOwnProperty('type') && params.type === 'menu';
  }

  private initAllActionAttributes() {
    let index = 0;
    this.actions.forEach(action => {
      if (!action.hide && !this.shouldHide(this.node.data, index, action)) {
        this.activeCount++;
      }
      index ++;
      if (!action.id) {
        action.id = titleToId(action.title);
      }
    });
  }

  refresh(params: any): boolean {
    return false;
  }

  onClicked(action: any) {
    if (typeof action.click === 'function') {
      action.click(this.node.data);
    } else {
      this.action(action.id, this.node.data);
    }
  }

  shouldHide(data: any, index: number, action: GridAction): boolean {
    if(typeof action.hide === 'function') {
      return action.hide(data);
    }

    return action.hide === true || (data && data.actions && data.actions[index] === false);
  }
}
