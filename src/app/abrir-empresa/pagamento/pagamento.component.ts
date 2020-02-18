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
    loading = false;
    ngOnInit() {

    }

    pagarAgora() {
        this.model.assinatura.tipoPagamento = 'credit_card';

        if (this.verificar())
            this.salvar();

    }

    verificar() {

        let validate = true;
        if (this.model.cartaoCredito.vencimento) {
            var mes = parseInt(this.model.cartaoCredito.vencimento.substring(0, 1));
        }
        else {
            this.toastr.error('Mês de vencimento informado inválido.');
            validate = false;
        }

        if (!this.model.cartaoCredito.cvv) {
            this.toastr.error('Código de verificação informado inválido.');
            validate = false;

        }
        if (!this.model.cartaoCredito.numero) {
            this.toastr.error('Número do cartão informado inválido.');
            validate = false;
        }

        if (mes > 12) {
            this.toastr.error('Mês de vencimento informado inválido.');
            validate = false;
        }
        if (!this.termoAceito) {
            this.toastr.error('É necessário aceitar o termo.');
            validate = false;
        }
        return validate;

    }

    gerarBoleto() {
        this.model.assinatura.tipoPagamento = 'bank_slip';
        if (!this.termoAceito) {
            this.toastr.error('É necessário aceitar o termo.');
        } else {
            this.salvar();
        }
    }

    salvar() {
        this.loading = true;
        console.log(this.model);

        var cliente = this.model.cliente;
        var assinatura = this.model.assinatura;
        var cartaoCredito = this.model.cartaoCredito;

        this.abrirEmpresaService.salvar(cliente, assinatura, cartaoCredito)
        .subscribe(response => {
            console.log(response);
            this.toastr.success('Cliente salvo com sucesso.');
            this.trocarTela.emit('contrato');
            if (this.model.assinatura.tipoPagamento == 'bank_slip') {
                window.open(response.bill.charges[0].print_url, '_blank');
            }
            this.loading = false;
        },
            error => {
                this.loading = false;
                this.toastr.error('Erro ao realizar a transação.');
            }
        );
    }
}
