import { Component, OnInit, Output, Input, EventEmitter, ViewChild } from '@angular/core';
import { AbrirEmpresaService } from 'app/layouts/abrir-empresa/abrir-empresa.services';
import { ModalComponent } from 'app/core/components/ng2-bs4-modal/lib/components/modal';
import { Route, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-dados-empresa',
    templateUrl: './dados-empresa.component.html',
    styleUrls: ['./dados-empresa.component.sass']
})
export class DadosEmpresaComponent implements OnInit {

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

    constructor(private abrirEmpresaService: AbrirEmpresaService) { }

    ngOnInit() {
        console.log(this.model);
        this.tipoSociedade = [{ id: '1', descricao: 'Apenas eu' }, { id: '2', descricao: 'Sócio + 1' }, { id: '1', descricao: 'Sócio + 2' }]
        this.getCnae();
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

    getCnae() {
        this.abrirEmpresaService.getCnaes().subscribe(response => {
            this.cnaes = response.resultado;
            this.cnaes.forEach(element => {
                element.checked = false
            });
        })
    }

    closeCnaePrimaria() {
        this.modalCnaePrimaria.close();
    }
    closeCnaeSecundaria() {
        this.cnaeSecundaria.close();
    }

    openCnaePrimaria() {
        this.modalCnaePrimaria.open();
    }

    openCnaeSecundaria() {
        this.cnaeSecundaria.open();
    }

    escolherTipoSociedade() {
        console.log(this.tipoSociedade);
    }

    adicionarPrimario() {
        this.model.atividadePrimaria = this.cnaes.find(p => p.id === this.atividadePrimariaChecked)
        this.closeCnaePrimaria();
    }

    adicionarSecundaria() {
        this.model.atividadeSecundaria = this.cnaes.find(p => p.id === this.atividadeSecundariaChecked)
        this.closeCnaeSecundaria();
    }
}
