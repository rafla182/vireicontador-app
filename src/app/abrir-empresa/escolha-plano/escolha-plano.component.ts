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

        this.abrirEmpresaService.salvar(this.model).subscribe(arg => { }
        );

        if (cliente == 0) {
            this.model.plano.queroSerCliente = false;
        } else {
            this.model.plano.queroSerCliente = true;
        }

        console.log(this.model);
        
        this.trocarTela.emit('pagamento');
    }

}
