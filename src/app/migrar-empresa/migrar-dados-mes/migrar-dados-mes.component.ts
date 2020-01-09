import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-migrar-dados-mes',
    templateUrl: './migrar-dados-mes.component.html',
    styleUrls: ['./migrar-dados-mes.component.sass']
})
export class MigrarDadosMesComponent implements OnInit {
    @Input() tela;
    @Output() trocarTela: EventEmitter<string> = new EventEmitter();
    @Input() model: any;
    meses = [{ id: 1, descricao: 'Janeiro' },
    { id: 2, descricao: 'Fevereiro' },
    { id: 3, descricao: 'Março' },
    { id: 4, descricao: 'Abril' },
    { id: 5, descricao: 'Maio' },
    { id: 6, descricao: 'Junho' },
    { id: 7, descricao: 'Julho' },
    { id: 8, descricao: 'Agosto' },
    { id: 9, descricao: 'Setembro' },
    { id: 10, descricao: 'Outubro' },
    { id: 11, descricao: 'Novembro' },
    { id: 12, descricao: 'Dezembro' }];
    mesCalculado: any;
    mesCalculadoDesc: any;
    mes: number;
    ano: any;
    loading = false;
    constructor() { }

    ngOnInit() {
        this.model.competencia.ano = '2020';
    }

    irParaPagamento() {
        this.trocarTela.emit('pagamento');
    }

    irParaSocios() {
        this.trocarTela.emit('socios');
    }

    escolherMes() {
        console.log(this.mes);
        this.model.competencia.mes = this.meses.find(p => p.id == this.mes).descricao;
        this.mesCalculadoDesc = this.meses.find(p => p.id == (this.mes - 1)).descricao;
        this.mesCalculado = this.mes + 1;
    }

}
