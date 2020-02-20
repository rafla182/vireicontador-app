import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AbrirEmpresaService } from 'app/layouts/abrir-empresa/abrir-empresa.services';
import { MigrarEmpresaService } from 'app/layouts/migrar-empresa/migrar-empresa.services';

@Component({
    selector: 'app-migrar-pagamento',
    templateUrl: './migrar-pagamento.component.html',
    styleUrls: ['./migrar-pagamento.component.scss']
})
export class MigrarPagamentoComponent implements OnInit {
    @Input() tela;
    @Output() trocarTela: EventEmitter<string> = new EventEmitter();
    @Input() model: any;
    termoAceito = false;
    showCompetencia = true;
    loading = false;
    constructor(private toastr: ToastrService, private migrarEmpresaService: MigrarEmpresaService) { }

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

        var empresa = this.model.empresa;
        var assinatura = this.model.assinatura;
        var cartaoCredito = this.model.cartaoCredito;
        var competencia = this.model.competencia;
        console.log(empresa);
        console.log(assinatura);
        console.log(cartaoCredito);
        console.log(socios);

        var socios = this.model.socios.filter(p => p.cpf != '' || p.nome != '' || p.email != '').map(x => {
            return {
                cpf: x.cpf,
                nome: x.nome,
                percentual: x.percentual,
                administrador: x.administrador,
                email: x.email,
                sexo: x.sexo == 1 ? 'Masculino' : 'Feminino'
            }
        });

        console.log(socios);

        this.migrarEmpresaService.salvar(empresa, assinatura, cartaoCredito, socios, competencia)
            .subscribe(response => {
                console.log(response);
                this.toastr.success('Cliente salvo com sucesso.');
                this.trocarTela.emit('contrato');
                if (this.model.assinatura.tipoPagamento == 'bank_slip') {
                    window.open(response.bill.charges[0].print_url, 'Boleto', "height=500,width=500");
                }
                this.loading = false;
            },
                error => {
                    this.loading = false;
                    error.forEach(e => this.toastr.error(e.message));
                }
            );
    }
}
