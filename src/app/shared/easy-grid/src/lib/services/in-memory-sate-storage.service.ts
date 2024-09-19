/*
 * This file is part of the bracIT Angular
 *
 * Copyright (c) 2019-2023, BRAC IT SERVICES LIMITED <http://www.bracits.com>
 *
 */

import {StateStorageInterface} from "./state-storage-interface";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class InMemorySateStorageService implements StateStorageInterface {
    private state: Map<string, any> = new Map<string, any>();

    public setState(key: string, state: any) {
        this.state.set(key, state);
    }

    public getState(key: string) {
        return Promise.resolve(this.state.get(key));
    }
}
