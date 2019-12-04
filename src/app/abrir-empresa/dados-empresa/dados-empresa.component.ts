import { Component, OnInit, Output, Input, EventEmitter, ViewChild } from '@angular/core';
import { AbrirEmpresaService } from 'app/layouts/abrir-empresa/abrir-empresa.services';
import { ModalComponent } from 'app/core/components/ng2-bs4-modal/lib/components/modal';
import { Route, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

    sociedade: any;

    constructor(private abrirEmpresaService: AbrirEmpresaService,
        private toastr: ToastrService) { }

    ngOnInit() {
        console.log(this.model);
        this.tipoSociedade = [{ id: 1, descricao: 'Apenas eu' }, { id: 2, descricao: 'Sócio + 1' }, { id: 3, descricao: 'Sócio + 2' }]
        this.getCnae();
        this.model.cliente.atividadePrimaria = {
        };
        this.model.cliente.atividadeSecundaria = {
        }
    }

    irParaPlano() {

        this.model.cliente.tipoSociedade = this.tipoSociedade.find(p => this.sociedade == p.id).descricao;

        let validate = true;
        if (!this.model.cliente.tipoSociedade) {
            this.toastr.error('Tipo de sociedade não está preenchido.');
            validate = false;
        }

        if (!(this.model.cliente.atividadePrimaria.id > 0)) {
            this.toastr.error('É necessário informar a atividade primária.');
            validate = false;
        }

        if (validate) {
            this.trocarTela.emit('plano');
        }

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
        this.model.cliente.atividadePrimaria = this.cnaes.find(p => p.id === this.atividadePrimariaChecked)
        this.closeCnaePrimaria();
    }

    adicionarSecundaria() {
        this.model.cliente.atividadeSecundaria = this.cnaes.find(p => p.id === this.atividadeSecundariaChecked)
        this.closeCnaeSecundaria();
    }
}
