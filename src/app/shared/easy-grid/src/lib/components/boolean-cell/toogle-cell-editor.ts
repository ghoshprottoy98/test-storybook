/*
 * This file is part of the Easy Grid Angular
 *
 * Copyright (c) 2019-2023, BRAC IT SERVICES LIMITED <http://www.bracits.com>
 *
 */

import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import {MatSlideToggle} from "@angular/material/slide-toggle";

@Component({
  selector: 'app-toggle-cell-editor',
  template: `
    <mat-slide-toggle class="ml-5" #toggleEditor [checked]="params.value"
                     (click)="$event.stopPropagation();"
                     (change)="onValueChanged($event)">
    </mat-slide-toggle>
  `,
})
export class ToggleCellEditorComponent implements ICellEditorAngularComp, AfterViewInit {
  public params: any;
  public oldValue: any;
  public value: any;

  @ViewChild('toggleEditor', { static: false }) public toggleEditor: MatSlideToggle | undefined;

  agInit(params: any): void {
    this.params = params;
    this.oldValue = params.value;
    this.value = params.value;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      // Set focus on the slide toggle element
      this.toggleEditor?.focus();
    }, 0);
  }

  getValue(): any {
    return this.value;
  }

  isPopup(): boolean {
    return false;
  }

  onValueChanged(event: any) {
    this.value = event.checked;
  }
}
