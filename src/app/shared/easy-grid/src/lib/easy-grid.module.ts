/*
 * This file is part of the Easy Grid Angular
 *
 * Copyright (c) 2019-2023, BRAC IT SERVICES LIMITED <http://www.bracits.com>
 *
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EasyGridComponent} from './easy-grid.component';
import {ActionRendererComponent} from './components/action-renderer/action-renderer.component';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {BooleanCellComponent} from './components/boolean-cell/boolean-cell.component';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {LinkCellComponent} from './components/link-cell/link-cell.component';
import {RouterModule} from '@angular/router';
import {ResolveUrlPipe} from './pipes/resolve-url.pipe';
import {SelectFilterComponent} from './components/select-filter/select-filter.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HtmlCellRendererComponent } from './components/html-cell-renderer/html-cell-renderer.component';
import {LinkableHtmlCellRendererComponent} from './components/linkable-html-cell-renderer/linkable-html-cell-renderer.component';
import { ImageCellRendererComponent } from './components/image-cell-renderer/image-cell-renderer.component';
import {InlineSVGModule} from "ng-inline-svg-2";
import {AgGridModule} from "ag-grid-angular";
import {ToggleCellEditorComponent} from "./components/boolean-cell/toogle-cell-editor";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {HoverClassDirective} from "./directives/hover-class.directive";
import {HumanizeFilter} from "./pipes/humanize-filter";
import { BulkActionsComponent } from './components/bulk-actions/bulk-actions.component';
import {MatBadgeModule} from "@angular/material/badge";
import {BulkActionComponent} from "./components/bulk-actions/bulk-action.component";
import {NotificationDialogComponent} from "./components/notification/notification-dialog.component";
import {MatInputModule} from "@angular/material/input";
import {BitmaskFilterComponent} from "./components/bitmask-filter/bitmask-filter.component";
import {BitmaskCellRendererComponent} from "./components/bitmask-cell-renderer/bitmask-cell-renderer.component";
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    EasyGridComponent,
    ActionRendererComponent,
    BooleanCellComponent,
    LinkCellComponent,
    ResolveUrlPipe,
    SelectFilterComponent,
    HtmlCellRendererComponent,
    LinkableHtmlCellRendererComponent,
    ImageCellRendererComponent,
    ToggleCellEditorComponent,
    HoverClassDirective,
    HumanizeFilter,
    BulkActionsComponent,
    BulkActionComponent,
    BitmaskFilterComponent,
    BitmaskCellRendererComponent,
    NotificationDialogComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    AgGridModule,
    MatButtonModule,
    MatTooltipModule,
    RouterModule,
    FormsModule,
    InlineSVGModule,
    MatSlideToggleModule,
    MatBadgeModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    EasyGridComponent
  ]
})
export class EasyGridModule {
}
