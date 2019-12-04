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
        this.model.plano.cartaoCredito = {
            numero: null,
            cvv: null,
            titularCartao: null,
            vencimento: null
        };
    }

    pagarAgora() {
        this.model.fatura.tipoPagamento = 'credit_card';

        if (!this.termoAceito) {
            this.toastr.error('É necessário aceitar o termo.');
        }
        this.salvar();
    }

    gerarBoleto() {
        this.model.fatura.tipoPagamento = 'bank_slip';
    }

    salvar() {
        console.log(this.model);

        var cliente = this.model.cliente;
        var assinatura = this.model.plano;
        var fatura = this.model.fatura;

        this.abrirEmpresaService.salvar(cliente, assinatura, fatura).subscribe(arg =>
            this.toastr.error('Cliente salvo com sucesso.')
        );
    }
}
