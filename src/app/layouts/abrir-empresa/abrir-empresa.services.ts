import { Injectable } from '@angular/core';
import { HttpService } from 'app/core/services/http.service';

@Injectable()
export class AbrirEmpresaService {

    private pegarCepUrl: string = 'https://viacep.com.br/ws/';
    private getCnaesUrl = 'cnaes';

    constructor(private httpService: HttpService) { }

    pegarCep(numero) {

        return this.httpService.getFullUrl(`${this.pegarCepUrl}${numero}/json`);
    }

    getCnaes() {
        return this.httpService.get(`${this.getCnaesUrl}`);
    }

}
