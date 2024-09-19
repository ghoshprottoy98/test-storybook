/*
 * This file is part of the Easy Grid Angular
 *
 * Copyright (c) 2019-2023, BRAC IT SERVICES LIMITED <http://www.bracits.com>
 *
 */
import {ThemePalette} from "@angular/material/core";

export interface RouteParamHash {
    [key: string]: string;
}

type MetaHash = RouteParamHash;
type SelectionMode = 'id' | 'filter';

interface BulkAction {
    mode?: SelectionMode
    url?: string | boolean | undefined,
    type?: string,
    select_only?: boolean,
    blob?: boolean
}
export interface GridAction {
    icon: string;
    iconOnly: boolean;
    title: string;
    href?: string;
    routerPath?: string;
    link: string;
    routerParams: RouteParamHash;
    bulk?: BulkAction;
    target?: string;
    meta?: MetaHash;
    class?: ThemePalette;
    hide?: boolean | ((data: any) => boolean);
    id: string;
    click?: (id: string, node: any) => {};
}
