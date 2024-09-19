/*
 * This file is part of the Easy Grid Angular
 *
 * Copyright (c) 2019-2023, BRAC IT SERVICES LIMITED <http://www.bracits.com>
 *
 */

import {RouteParamHash} from '../model/grid-action';
import {getValueByKey, isEmpty} from "./string-util";

export function resolveRoute(routerPath: string, data: any, routerParams?: RouteParamHash) {
  if (!data || isEmpty(routerPath)) {
    return undefined;
  }

  const placeholders = routerPath.match(/(\:[_a-zA-Z]+)/gi);

  if (placeholders === null) {
    return routerPath;
  }

  let value;

  for (const i in placeholders) {
    if (placeholders.hasOwnProperty(i)) {
      let key = placeholders[i].replace(/\:/g, '');

      if (routerParams && routerParams.hasOwnProperty(key)) {
        key = routerParams[key];
      }
      value = getValueByKey(data, key);
      if (value) {
        routerPath = routerPath.replace(placeholders[i], value);
      }
    }
  }
  return routerPath;
}
