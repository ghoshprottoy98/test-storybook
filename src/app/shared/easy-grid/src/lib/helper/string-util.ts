/*
 * This file is part of the Easy Grid Angular
 *
 * Copyright (c) 2019-2023, BRAC IT SERVICES LIMITED <http://www.bracits.com>
 *
 */

export function isEmpty(value?: string) {
  return value === undefined || value === null || value === '';
}

export function isNotEmpty(value?: string) {
  return !isEmpty(value);
}

export function lpad(num: number, totalStringSize: number): string {
  let asString: string = num + '';
  while (asString.length < totalStringSize) {
    asString = '0' + asString;
  }
  return asString;
}

export const titleToId = (title: string) => title.replace(/ /g, '_').toLowerCase();

export function getValueByKey(object:any, key: string): string {
  const keys = key.split('.');

  let data = object;

  for (const i in keys) {
    if (data.hasOwnProperty(keys[i])) {
      data = data[keys[i]];
    } else {
      data = null;
      break;
    }
  }

  return data;
}

export function buildRegxFromString(str: string, flag?: string): RegExp {
  return new RegExp(str, flag || 'i');
}

export function camelCaseToHumanText(camelCase?: string) {
  if (!camelCase) {
    return null;
  }
  const rex = /([A-Z])([A-Z])([a-z])|([a-z])([A-Z])/g;
  const words = camelCase.replace(rex, '$1$4 $2$3$5').replace(/[_\-.]+/g, ' ').replace(/\s{2,}/g, ' ').trim().split(' ');
  return words.map(
      word => word.substring(0, 1)
      .toUpperCase() + ((word.length > 1) ? word.substring(1, word.length) : '')
  ).join(' ');
}


