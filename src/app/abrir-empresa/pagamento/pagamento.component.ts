import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AbrirEmpresaService } from 'app/layouts/abrir-empresa/abrir-empresa.services';

@Component({
    selector: 'app-pagamento',
    templateUrl: './pagamento.component.html',
    styleUrls: ['./pagamento.component.scss']
})
export class PagamentoComponent implements OnInit {
    @Input() tela;
    @Output() trocarTela: EventEmitter<string> = new EventEmitter();
    @Input() model: any;
    termoAceito = false;
    constructor(private toastr: ToastrService, private abrirEmpresaService: AbrirEmpresaService) { }

    ngOnInit() {
        this.model.cartaoCredito = {
            numero: null,
            cvv: null,
            titularCartao: null,
            vencimento: null
        };
    }

    pagarAgora() {
        this.model.tipoPagamento = 'cartaoCredito';
       
        console.log(this.termoAceito);
        if (!this.termoAceito) {
            this.toastr.error('É necessário aceitar o termo.');
        }
        console.log(this.model);

        this.abrirEmpresaService.salvar(this.model).subscribe(arg =>
            this.toastr.error('Cliente salvo com sucesso.')
            );
        
    }

    gerarBoleto() {
        this.model.tipoPagamento = 'boleto';
        console.log(this.model);
    }
}
