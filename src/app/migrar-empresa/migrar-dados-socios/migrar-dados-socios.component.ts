import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-migrar-dados-socios',
    templateUrl: './migrar-dados-socios.component.html',
    styleUrls: ['./migrar-dados-socios.component.sass']
})
export class MigrarDadosSociosComponent implements OnInit {
    @Input() tela;
    @Output() trocarTela: EventEmitter<string> = new EventEmitter();
    @Input() model: any;
    sexoOp = [{ id: 1, descricao: 'Masculino' }, { id: 2, descricao: 'Feminino' }, { id: 3, descricao: 'Outros' }];
    loading = false;
    constructor() { }

    ngOnInit() {
     
        this.model.socios.push({ id: 1, nome: '', cpf: '', email: '', percentual: 0, sexoOp: this.sexoOp, sexo: { id: 1, descricao: 'Masculino' }, administrador: false });
        console.log(this.model.socios);
    }

    irParaPagamento() {
        this.trocarTela.emit('pagamento');
    }

    adicionarSocio() {
        var index = this.model.socios[this.model.socios.length - 1];
        this.model.socios.push({ id: index, nome: '', cpf: '', email: '', percentual: 0, sexoOp: this.sexoOp, sexo: { id: 1, descricao: 'Masculino' }, administrador: false });
    }

    removerSocio(id) {
        console.log(id);
        console.log(this.model.socios);
        let index = this.model.socios.findIndex(d => d.id === id);
        this.model.socios.splice(index, 1)
    }

}
