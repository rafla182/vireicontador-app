import { Component, OnInit, Output, Input, EventEmitter, ViewChild } from '@angular/core';
import { AbrirEmpresaService } from 'app/layouts/abrir-empresa/abrir-empresa.services';
import { ModalComponent } from 'app/core/components/ng2-bs4-modal/lib/components/modal';
import { Route, ActivatedRoute } from '@angular/router';
import { MigrarEmpresaService } from 'app/layouts/migrar-empresa/migrar-empresa.services';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-migrar-dados-empresa',
    templateUrl: './migrar-dados-empresa.component.html',
    styleUrls: ['./migrar-dados-empresa.component.sass']
})
export class MigrarDadosEmpresaComponent implements OnInit {

    termoPrimaria: string;
    cnaes: any = [];
    atividadePrimariaChecked: number;
    atividadeSecundariaChecked: number;
    termoSecundaria: string;
    loading = false;
    showPosCnpj = false;
    regimesTributario = [];
    inscricaoEstadualOp = [];
    regimeTributario: any;
    inscricaoEstadual = 2;
    termoAceitoMigrar = false;
    termoAceitoMigrar2 = false;
    confirmar = false;

    @Input() model: any;

    @Output() trocarTela: EventEmitter<string> = new EventEmitter();

    @ViewChild('modalCnaePrimaria', { static: true })
    modalCnaePrimaria: ModalComponent;

    @ViewChild('cnaeSecundaria', { static: true })
    cnaeSecundaria: ModalComponent;

    constructor(private abrirEmpresaService: MigrarEmpresaService, private toastr: ToastrService) { }

    ngOnInit() {
        this.regimesTributario = [{ id: 1, descricao: 'LUCRO PRESUMIDO' }, { id: 2, descricao: 'MEI' }, { id: 3, descricao: 'SIMPLES NACIONAL' }];
        this.inscricaoEstadualOp = [{ id: 1, descricao: 'SIM' }, { id: 2, descricao: 'NÃO' }];
    }

    irParaUsuario() {
        this.trocarTela.emit('usuario');
    }

    irParaPlano() {

        let validate = true;

        if (!this.model.empresa.cnpj) {
            this.toastr.error('CNPJ não preenchido.')
            validate = false;
        }
        if (!this.model.empresa.nomeFantasia) {
            this.toastr.error('Nome não preenchido.')
            validate = false;
        }
        if (!this.termoAceitoMigrar) {
            this.toastr.error('É necessário declarar a veracidade das informações.');
            validate = false;
        }
        if (validate) {
            this.trocarTela.emit('socios');
        }
    }

    escolherRegime() {
        this.model.empresa.regimeTributario = this.regimesTributario.find(p => p.id == this.regimeTributario).descricao;
    }

    escolherInscricao() {
        var inscricao = this.inscricaoEstadualOp.find(p => p.id == this.inscricaoEstadual);
        if (inscricao) {
            this.model.empresa.inscricaoEstadual = inscricao.id == 1 ? true : false;
        }
    }

    confirmarEmpresa() {

        let validate = true;

        if (!this.model.empresa.cnpj) {
            this.toastr.error('CNPJ não preenchido.')
            validate = false;
        }
        if (!this.model.empresa.nomeFantasia) {
            this.toastr.error('Nome não preenchido.')
            validate = false;
        }
        if (!this.termoAceitoMigrar) {
            this.toastr.error('É necessário declarar a veracidade das informações.');
            validate = false;
        }
        if (!this.regimeTributario) {
            this.toastr.error('É necessário informar o Regime Tributário.');
            validate = false;
        }
        if (validate) {
            this.confirmar = true;
        }

    }

    pegarEmpresa() {


        if (this.model.empresa.cnpj) {
            this.loading = true;

            this.abrirEmpresaService.pegarCNPJ(this.model.empresa.cnpj).subscribe(response => {
                console.log(response);
                this.model.empresa.razaoSocial = response.resultado.nome;
                this.model.empresa.cep = response.resultado.cep;
                this.model.empresa.estado = response.resultado.uf;
                this.model.empresa.cidade = response.resultado.municipio;
                this.model.empresa.bairro = response.resultado.bairro;
                this.model.empresa.numero = response.resultado.numero;
                this.model.empresa.logradouro = response.resultado.logradouro;
                this.model.empresa.atividadePrimaria = response.resultado.atividadePrincipal.map(p => {
                    return {
                        codigo: p.code,
                        descricao: p.text
                    }
                })[0];
                this.model.empresa.atividadesSecundarias = response.resultado.atividadesSecundarias.map(p => {
                    return {
                        codigo: p.code,
                        descricao: p.text
                    }
                });
                this.loading = false;
                this.showPosCnpj = true;

            });
        }
    }

}
