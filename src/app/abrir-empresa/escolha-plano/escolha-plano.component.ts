import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AbrirEmpresaService } from 'app/layouts/abrir-empresa/abrir-empresa.services';

@Component({
    selector: 'app-escolha-plano',
    templateUrl: './escolha-plano.component.html',
    styleUrls: ['./escolha-plano.component.css']
})
export class EscolhaPlanoComponent implements OnInit {
    @Input() tela;
    @Output() trocarTela: EventEmitter<string> = new EventEmitter();
    @Input() model: any;

    constructor(private abrirEmpresaService: AbrirEmpresaService) { }

    ngOnInit() {
    }

    irParaPagamento(cliente) {

        this.trocarTela.emit('pagamento');
    }

}
