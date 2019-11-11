import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-escolha-plano',
    templateUrl: './escolha-plano.component.html',
    styleUrls: ['./escolha-plano.component.css']
})
export class EscolhaPlanoComponent implements OnInit {
    @Input() tela;
    @Output() trocarTela: EventEmitter<string> = new EventEmitter();
    @Input() model: any;

    constructor() { }

    ngOnInit() {
    }

    irParaPagamento(cliente) {
        console.log(cliente);
        if (cliente == 0) {
            this.model.cliente = false;
        } else {
            this.model.cliente = true;
        }
        this.trocarTela.emit('pagamento');
    }

}
