/*
 * This file is part of the Easy Grid Angular
 *
 * Copyright (c) 2019-2023, BRAC IT SERVICES LIMITED <http://www.bracits.com>
 *
 */

import {Pipe, PipeTransform} from '@angular/core';
import {camelCaseToHumanText} from "../helper/string-util";

/**
 * Returns only first letter of string
 */
@Pipe({
  name: 'humanize',
  pure: true
})
export class HumanizeFilter implements PipeTransform {
  /**
   * Transform
   *
   * @param value: any
   * @param args: any
   */
  transform(value: any, args?: any): any {
    return camelCaseToHumanText(value);
  }
}
