/*
 * This file is part of the Easy Grid Angular
 *
 * Copyright (c) 2019-2023, BRAC IT SERVICES LIMITED <http://www.bracits.com>
 *
 */

import {Pipe, PipeTransform} from '@angular/core';
import {RouteParamHash} from '../model/grid-action';
import {resolveRoute} from "../helper/path-helper";

@Pipe({
  name: 'resolveUrl',
  pure: true,
})
export class ResolveUrlPipe implements PipeTransform {

  transform(path: string, data: any[], routerParams?: RouteParamHash ): unknown {
    return resolveRoute(path, data, routerParams);
  }
}
