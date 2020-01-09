import { Injectable } from '@angular/core';
import { HttpService } from 'app/core/services/http.service';

@Injectable()
export class MigrarEmpresaService {

    private pegarCNPJUrl: string = 'cnpj/';

    private getCnaesUrl = 'cnaes';
    private salvarUrl = 'salvar-migrar';
    private pegarPLanoUrl = 'hash/';


    constructor(private httpService: HttpService) { }

    pegarCNPJ(numero) {
        return this.httpService.get(`${this.pegarCNPJUrl}${numero}`);
    }

    salvar(empresa, assinatura, cartaoCredito, socios, competencia) {
        return this.httpService.post(`${this.salvarUrl}`, { empresa: empresa, assinatura: assinatura, cartao: cartaoCredito, socios: socios, competencia: competencia });
    }

    pegarPlano(email: any) {
        return this.httpService.get(`${this.pegarPLanoUrl}${email}`);
    }
}
