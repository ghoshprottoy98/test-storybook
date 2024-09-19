import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GridAction} from "../../model/grid-action";

@Component({
  selector: 'bulk-actions',
  templateUrl: './bulk-actions.component.html',
})
export class BulkActionsComponent {

  @Input() actions: GridAction[] = [];
  @Output() clicked = new EventEmitter<any>();
  @Input() disabled: boolean = false;
  @Input() selected: number = 0;
  @Input() total: number = 0;
  @Input() maxSelectionCount: number = 0;
  get eligible(): number {
    if(this.selected > 0) {
      return this.selected;
    }

    if(this.maxSelectionCount === 0) {
      return this.total;
    }

    return Math.min(this.total, this.maxSelectionCount)
  }

  onClicked(action: any) {
    this.clicked.emit(action)
  }

  shouldHide(action: any) {
    return false;
  }
}
