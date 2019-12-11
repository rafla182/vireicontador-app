import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-sucesso',
    templateUrl: './sucesso.component.html',
    styleUrls: ['./sucesso.component.css']
})
export class SucessoComponent implements OnInit {
    @Input() tela;

    @Output() trocarTela: EventEmitter<string> = new EventEmitter();
    @Input() model: any;

    constructor() { }

    ngOnInit() {
    }


}
