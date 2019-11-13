import { Injectable } from '@angular/core';
import { HttpService } from 'app/core/services/http.service';

@Injectable()
export class MigrarEmpresaService {

    private pegarCNPJUrl: string = 'cnpj/';

    constructor(private httpService: HttpService) { }

    pegarCNPJ(numero) {
        return this.httpService.get(`${this.pegarCNPJUrl}${numero}`);
    }
}
