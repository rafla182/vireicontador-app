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
        private formBuilder: FormBuilder,
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
        if (!this.model.empresa.telefone2) {
            this.toastr.error('Telefone 2 não preenchido.')
            validate = false;
        }
       
        if (validate) {
            this.trocarTela.emit('empresa');
        }
        
    }

}
