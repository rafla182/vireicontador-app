import { Component, OnInit, Output, Input, EventEmitter, ViewChild } from '@angular/core';
import { AbrirEmpresaService } from 'app/layouts/abrir-empresa/abrir-empresa.services';
import { ModalComponent } from 'app/core/components/ng2-bs4-modal/lib/components/modal';
import { Route, ActivatedRoute } from '@angular/router';
import { MigrarEmpresaService } from 'app/layouts/migrar-empresa/migrar-empresa.services';

@Component({
    selector: 'app-migrar-dados-empresa',
    templateUrl: './migrar-dados-empresa.component.html',
    styleUrls: ['./migrar-dados-empresa.component.sass']
})
export class MigrarDadosEmpresaComponent implements OnInit {

    termoPrimaria: string;
    cnaes: any = [];
    tipoSociedade: any = [];
    atividadePrimariaChecked: number;
    atividadeSecundariaChecked: number;
    termoSecundaria: string;
    @Input() model: any;

    @Output() trocarTela: EventEmitter<string> = new EventEmitter();

    @ViewChild('modalCnaePrimaria', { static: true })
    modalCnaePrimaria: ModalComponent;

    @ViewChild('cnaeSecundaria', { static: true })
    cnaeSecundaria: ModalComponent;

    constructor(private abrirEmpresaService: MigrarEmpresaService) { }

    ngOnInit() {
        console.log(this.model);
        this.tipoSociedade = [{ id: '1', descricao: 'Apenas eu' }, { id: '2', descricao: 'Sócio + 1' }, { id: '1', descricao: 'Sócio + 2' }]
        
        this.model.atividadePrimaria = {
            id: 0
        };
        this.model.atividadeSecundaria = {
            id: 0
        }
    }

    irParaPlano() {
        this.trocarTela.emit('plano');
    }

    irParaEmpresa() {
        this.trocarTela.emit('usuario');
    }

    pegarEmpresa() {
        this.abrirEmpresaService.pegarCNPJ(this.model.cnpj).subscribe(response => {
            console.log(response);
            this.model.nome = response.resultado.nome;
        });
    }

}
