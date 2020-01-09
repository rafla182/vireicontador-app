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
    loading = false;
    constructor(private abrirEmpresaService: AbrirEmpresaService,
        private toastr: ToastrService) { }

    ngOnInit() {
    }

    irParaEmpresa() {

        let validate = true;
        if (!this.model.empresa.nome) {
            this.toastr.error('Nome não preenchido.')
            validate = false;
        }
        if (!this.model.empresa.email) {
            this.toastr.error('Email não preenchido.')
            validate = false;
        }
        if (!this.model.empresa.cpf) {
            this.toastr.error('CPF não preenchido.')
            validate = false;
        }
        if (!this.model.empresa.telefone) {
            this.toastr.error('Telefone não preenchido.')
            validate = false;
        }
        if (!this.cpf(this.model.empresa.cpf)) {
            this.toastr.error('CPF inválido.')
            validate = false;
        }
        if ((this.model.empresa.telefone == '00000000000') || (this.model.empresa.telefone == '11111111111') || (this.model.empresa.telefone == '22222222222') || (this.model.empresa.telefone == '33333333333') || (this.model.empresa.telefone == '44444444444') || (this.model.empresa.telefone == '55555555555') || (this.model.empresa.telefone == '66666666666') || (this.model.empresa.telefone == '77777777777') || (this.model.empresa.telefone == '88888888888') || (this.model.empresa.telefone == '99999999999')) {
            this.toastr.error('Telefone inválido.')
            validate = false;
        }
        if (validate) {
            this.trocarTela.emit('empresa');
        }

    }

    cpf(cpf: string): boolean {
        if (cpf == null) {
            return false;
        }
        if (cpf.length != 11) {
            return false;
        }
        if ((cpf == '00000000000') || (cpf == '11111111111') || (cpf == '22222222222') || (cpf == '33333333333') || (cpf == '44444444444') || (cpf == '55555555555') || (cpf == '66666666666') || (cpf == '77777777777') || (cpf == '88888888888') || (cpf == '99999999999')) {
            return false;
        }
        let numero: number = 0;
        let caracter: string = '';
        let numeros: string = '0123456789';
        let j: number = 10;
        let somatorio: number = 0;
        let resto: number = 0;
        let digito1: number = 0;
        let digito2: number = 0;
        let cpfAux: string = '';
        cpfAux = cpf.substring(0, 9);
        for (let i: number = 0; i < 9; i++) {
            caracter = cpfAux.charAt(i);
            if (numeros.search(caracter) == -1) {
                return false;
            }
            numero = Number(caracter);
            somatorio = somatorio + (numero * j);
            j--;
        }
        resto = somatorio % 11;
        digito1 = 11 - resto;
        if (digito1 > 9) {
            digito1 = 0;
        }
        j = 11;
        somatorio = 0;
        cpfAux = cpfAux + digito1;
        for (let i: number = 0; i < 10; i++) {
            caracter = cpfAux.charAt(i);
            numero = Number(caracter);
            somatorio = somatorio + (numero * j);
            j--;
        }
        resto = somatorio % 11;
        digito2 = 11 - resto;
        if (digito2 > 9) {
            digito2 = 0;
        }
        cpfAux = cpfAux + digito2;
        if (cpf != cpfAux) {
            return false;
        }
        else {
            return true;
        }
    }

}
