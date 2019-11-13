import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

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
    constructor(private toastr: ToastrService) { }

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
    }

    gerarBoleto() {
        this.model.tipoPagamento = 'boleto';
        console.log(this.model);
    }
}
