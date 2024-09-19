/*
 * This file is part of the bracIT Angular
 *
 * Copyright (c) 2019-2023, BRAC IT SERVICES LIMITED <http://www.bracits.com>
 *
 */

export interface StateStorageInterface {
    getState(key: string): Promise<any>

    setState(key: string, states: any): void
}
