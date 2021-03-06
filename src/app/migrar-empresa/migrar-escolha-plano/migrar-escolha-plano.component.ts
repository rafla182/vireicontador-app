import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-migrar-escolha-plano',
    templateUrl: './migrar-escolha-plano.component.html',
    styleUrls: ['./migrar-escolha-plano.component.css']
})
export class MigrarEscolhaPlanoComponent implements OnInit {
    @Input() tela;
    @Output() trocarTela: EventEmitter<string> = new EventEmitter();
    @Input() model: any;

    constructor() { }

    ngOnInit() {
    }

    irParaPagamento(cliente) {

        this.trocarTela.emit('pagamento');
    }

}
