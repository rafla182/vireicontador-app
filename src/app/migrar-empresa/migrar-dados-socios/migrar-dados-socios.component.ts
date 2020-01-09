import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

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
    constructor(private toastr: ToastrService) { }

    ngOnInit() {

        this.model.socios.push({ id: 1, nome: '', cpf: '', email: '', percentual: 0, sexoOp: this.sexoOp, sexo: { id: 1, descricao: 'Masculino' }, administrador: false });
        console.log(this.model.socios);
    }

    irParaPagamento() {
        if (this.model.socios.length == 1 && !this.model.socios[0].nome) {
            this.toastr.error('Necessário informar pelo menos um sócio.')

        }
        else {
            this.trocarTela.emit('mes');
        }
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
