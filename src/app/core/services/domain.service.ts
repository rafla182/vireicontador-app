
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DomainService {


    get(): any {

        const domains = [
            { url: 'localhost', api: 'http://localhost:12345/api/' },
            { url: 'vireicontador-app.azurewebsites.net', api: 'https://app-vireicontador.azurewebsites.net/api/' }
        ];

        const domain = domains.find(t => t.url === document.location.hostname);
        return domain ? domain : domains.find(t => t.url === 'vireicontador-app.azurewebsites.net');
    }
}
