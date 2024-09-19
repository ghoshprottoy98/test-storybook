/*
 * This file is part of the Easy Grid Angular
 *
 * Copyright (c) 2019-2023, BRAC IT SERVICES LIMITED <http://www.bracits.com>
 *
 */

import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[hover-class]'
})
export class HoverClassDirective {

  constructor(public elementRef: ElementRef) {
  }

  @Input('hover-class') hoverClass: any;

  @HostListener('mouseenter') onMouseEnter() {
    this.elementRef.nativeElement.classList.add(this.hoverClass);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.elementRef.nativeElement.classList.remove(this.hoverClass);
  }
}
