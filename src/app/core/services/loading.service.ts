import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

export function IsPresent(obj: any) {
    return obj !== undefined && obj !== null;
}

export class LoadingEvent {
    constructor(public visible: boolean) { }
}

@Injectable()
export class LoadingService {

    private _visible = true;

    private eventSource: Subject<LoadingEvent> = new Subject<LoadingEvent>();
    public events: Observable<LoadingEvent> = this.eventSource.asObservable();

    constructor() { }

    set visible(value: boolean) {
        if (IsPresent(value)) {
            this._visible = value;
            this.emitEvent(new LoadingEvent(this._visible));
        }
    }

    get visible(): boolean {
        return this._visible;
    }

    private emitEvent(event: LoadingEvent) {
        if (this.eventSource) {
            this.eventSource.next(event);
        }
    }

    start(onCompleted: Function = null) {
        this.visible = true;
    }

    stop() {
        this.visible = false;
    }
}