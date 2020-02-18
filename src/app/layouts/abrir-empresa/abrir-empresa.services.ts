import { Injectable } from '@angular/core';
import { HttpService } from 'app/core/services/http.service';

@Injectable()
export class AbrirEmpresaService {


    private pegarCepUrl: string = 'https://viacep.com.br/ws/';
    private getCnaesUrl = 'cnaes';
    private salvarUrl = 'salvar';
    private contratorUrl = 'contrato';
    private pegarPLanoUrl = 'hash/';
    constructor(private httpService: HttpService) { }

    pegarCep(numero) {

        return this.httpService.getFullUrl(`${this.pegarCepUrl}${numero}/json`);
    }

    getCnaes() {
        return this.httpService.get(`${this.getCnaesUrl}`);
    }

    salvar(cliente, assinatura, cartaoCredito) {
        return this.httpService.post(`${this.salvarUrl}`, { cliente: cliente, assinatura: assinatura, cartao: cartaoCredito });
    }

    pegarPlano(email: any) {
        return this.httpService.get(`${this.pegarPLanoUrl}${email}`);
    }

    sendContrato(contrato, cliente) {
        return this.httpService.post(`${this.contratorUrl}`, { contrato: contrato, cliente: cliente });
    }
}
