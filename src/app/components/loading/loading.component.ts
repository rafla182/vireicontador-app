import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

    @Input() show: any;
    @Output() loadingSet: EventEmitter<string> = new EventEmitter();

    constructor() {
    }
    ngOnInit() {
        console.log(this.show);
    }


    loadingSetProx(loading) {
        this.loadingSet.emit(loading);
    }

}