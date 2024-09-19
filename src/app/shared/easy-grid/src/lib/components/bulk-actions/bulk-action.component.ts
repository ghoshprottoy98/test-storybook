import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GridAction} from "../../model/grid-action";

@Component({
  selector: 'bulk-action',
  template: `
    <button (click)="clicked.emit(action)" [disabled]="disable" mat-menu-item>
      <mat-icon [color]="action.class || 'primary'" *ngIf="action.icon">{{action.icon}}</mat-icon>
      <span>{{action.title}} <span *ngIf="label" class="badge badge-secondary badge-circle m-2">{{label}}</span></span>
    </button>
  `
})
export class BulkActionComponent {

  @Input() action!: GridAction;
  @Output() clicked = new EventEmitter<any>();
  @Input() selected: number = 0;
  @Input() eligible: number = 0;
  @Input() total: number = 0;

  get label(): number | undefined {
    if(this.action.bulk?.mode === "filter") {
      return undefined;
    }

    if(this.action.bulk?.select_only) {
      return this.selected < 1 ? undefined : this.selected;
    }

    if(this.eligible > 0) {
      return this.eligible
    }

    return undefined
  }

  get disable(): boolean {
    if(this.total < 1) {
      return true
    }

    if(!this.action.bulk?.select_only) {
      return this.eligible < 1;
    }

    return this.selected < 1;
  }
}
