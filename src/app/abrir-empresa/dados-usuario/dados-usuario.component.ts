import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbrirEmpresaService } from 'app/layouts/abrir-empresa/abrir-empresa.services';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-dados-usuario',
    templateUrl: './dados-usuario.component.html',
    styleUrls: ['./dados-usuario.component.css']
})
export class DadosUsuarioComponent implements OnInit {
    registerForm: FormGroup;
    @Input() model: any;
    @Output() trocarTela: EventEmitter<string> = new EventEmitter();

    constructor(private abrirEmpresaService: AbrirEmpresaService,
        private formBuilder: FormBuilder,
        private toastr: ToastrService) { }

    ngOnInit() {
        this.model.cliente.empresaCidade = true;
    }

    irParaEmpresa() {

        let validate = true;
        if (!this.model.cliente.nome) {
            this.toastr.error('Nome não preenchido.')
            validate = false;
        }
        if (!this.model.cliente.email) {
            this.toastr.error('Email não preenchido.')
            validate = false;
        }
        if (!this.model.cliente.cpf) {
            this.toastr.error('CPF não preenchido.')
            validate = false;
        }
        if (!this.model.cliente.telefone) {
            this.toastr.error('Telefone não preenchido.')
            validate = false;
        }
        if (!this.model.cliente.cep || !this.model.cliente.estado
            || !this.model.cliente.cidade || !this.model.cliente.bairro || !this.model.cliente.logradouro || !this.model.cliente.numero) {
            this.toastr.error('Endereço não preenchido completo.')
            validate = false;
        }

        if (validate) {
            this.trocarTela.emit('empresa');
        }
    }

    pegarCep() {
        this.abrirEmpresaService.pegarCep(this.model.cliente.cep).subscribe(response => {
            this.model.cliente.estado = response.uf;
            this.model.cliente.cidade = response.localidade;
            this.model.cliente.bairro = response.bairro;
            this.model.cliente.logradouro = response.logradouro;
        });
    }
}
