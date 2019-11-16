import { Injectable } from '@angular/core';
import { HttpService } from 'app/core/services/http.service';

@Injectable()
export class AbrirEmpresaService {

    private pegarCepUrl: string = 'https://viacep.com.br/ws/';
    private getCnaesUrl = 'cnaes';
    private salvarUrl = 'salvar';

    constructor(private httpService: HttpService) { }

    pegarCep(numero) {

        return this.httpService.getFullUrl(`${this.pegarCepUrl}${numero}/json`);
    }

    getCnaes() {
        return this.httpService.get(`${this.getCnaesUrl}`);
    }

    salvar(cliente) {
        console.log(cliente);
        return this.httpService.post(`${this.salvarUrl}`, { cliente });
    }

}
