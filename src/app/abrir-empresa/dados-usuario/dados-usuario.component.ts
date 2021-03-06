import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbrirEmpresaService } from 'app/layouts/abrir-empresa/abrir-empresa.services';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstadosService } from 'app/core/services/estadocidade.service';

@Component({
    selector: 'app-dados-usuario',
    templateUrl: './dados-usuario.component.html',
    styleUrls: ['./dados-usuario.component.css']
})
export class DadosUsuarioComponent implements OnInit {
    registerForm: FormGroup;
    @Input() model: any;
    @Output() trocarTela: EventEmitter<string> = new EventEmitter();
    estados: any = [];
    cidades: any = [];
    cidade: any;
    estado: any;
    showEstado = false;
    loading = false;
    constructor(private abrirEmpresaService: AbrirEmpresaService,
        private estadocidadeService: EstadosService,
        private formBuilder: FormBuilder,
        private toastr: ToastrService) { }

    ngOnInit() {
        this.estados = this.estadocidadeService.get().map(p => {
            return {
                id: p.sigla,
                descricao: p.nome
            };
        });
    }

    phoneValidate(phone) {
        var isValid = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/.test(phone);
        return isValid;
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
        if (!this.phoneValidate(this.model.cliente.telefone)) {
            this.toastr.error('Telefone inválido.')
            validate = false;
        }
        if ((this.model.cliente.telefone == '00000000000') || (this.model.cliente.telefone == '11111111111') || (this.model.cliente.telefone == '22222222222') || (this.model.cliente.telefone == '33333333333') || (this.model.cliente.telefone == '44444444444') || (this.model.cliente.telefone == '55555555555') || (this.model.cliente.telefone == '66666666666') || (this.model.cliente.telefone == '77777777777') || (this.model.cliente.telefone == '88888888888') || (this.model.cliente.telefone == '99999999999')) {
            this.toastr.error('Telefone inválido.')
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
        this.loading = true;
        this.abrirEmpresaService.pegarCep(this.model.cliente.cep).subscribe(response => {
            this.model.cliente.estado = response.uf;
            this.model.cliente.cidade = response.localidade;
            this.model.cliente.bairro = response.bairro;
            this.model.cliente.logradouro = response.logradouro;
            this.loading = false;
        });
    }

    selecionarEmpresaCidade(value) {
        console.log(value);
        if (value == 1) {
            this.showEstado = true;

        } else {
            this.model.cliente.empresaEstado = '',
                this.model.cliente.empresaCidade = '';
            this.showEstado = false;
        }

    }

    selecionarEstado(event) {
        this.model.cliente.empresaEstado = event.descricao;
        this.cidades = this.estadocidadeService.get().find(p => p.sigla == event.id).cidades.map(p => {
            return {
                id: Math.random(),
                descricao: p
            };
        });
    }

    selecionarCidade(event) {
        this.model.cliente.empresaCidade = event.descricao;
    }

}
