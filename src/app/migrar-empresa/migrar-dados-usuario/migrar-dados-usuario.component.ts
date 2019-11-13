import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbrirEmpresaService } from 'app/layouts/abrir-empresa/abrir-empresa.services';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-migrar-dados-usuario',
    templateUrl: './migrar-dados-usuario.component.html',
    styleUrls: ['./migrar-dados-usuario.component.css']
})
export class MigrarDadosUsuarioComponent implements OnInit {
    registerForm: FormGroup;
    @Input() model: any;
    @Output() trocarTela: EventEmitter<string> = new EventEmitter();

    constructor(private abrirEmpresaService: AbrirEmpresaService,
        private formBuilder: FormBuilder,
        private toastr: ToastrService) { }

    ngOnInit() {
        this.model.empresaCidade = 'S';
    }

    irParaEmpresa() {

        // let validate = true;
        // if (!this.model.nome) {
        //     this.toastr.error('Nome não preenchido.')
        //     validate = false;
        // }
        // if (!this.model.email) {
        //     this.toastr.error('Email não preenchido.')
        //     validate = false;
        // }
        // if (!this.model.cpf) {
        //     this.toastr.error('CPF não preenchido.')
        //     validate = false;
        // }
        // if (!this.model.telefone) {
        //     this.toastr.error('Telefone não preenchido.')
        //     validate = false;
        // }
        // if (!this.model.cep || !this.model.estado
        //     || !this.model.cidade || !this.model.bairro || !this.model.logradouro || !this.model.numero) {
        //     this.toastr.error('Endereço não preenchido completo.')
        //     validate = false;
        // }

        // if (validate) {
        //     this.trocarTela.emit('empresa');
        // }
        this.trocarTela.emit('empresa');
    }

    pegarCep() {
        this.abrirEmpresaService.pegarCep(this.model.cep).subscribe(response => {
            console.log(response);
            this.model.estado = response.uf;
            this.model.cidade = response.localidade;
            this.model.bairro = response.bairro;
            this.model.logradouro = response.logradouro;
        });
    }
}
