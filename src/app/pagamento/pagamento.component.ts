import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-pagamento',
    templateUrl: './pagamento.component.html',
    styleUrls: ['./pagamento.component.scss']
})
export class PagamentoComponent implements OnInit {
    @Input() tela;
    @Input() model: any;
    termoAceito = false;
    constructor(private toastr: ToastrService) { }

    ngOnInit() {


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
