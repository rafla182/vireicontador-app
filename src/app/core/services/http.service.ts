import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { LoadingService } from './loading.service';
import { ToastrService } from 'ngx-toastr';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { DomainService } from './domain.service';
import { HttpResult } from '../models/result';

@Injectable()
export class HttpService {
    httpOptions: any;

    constructor(
        private httpClient: HttpClient,
        private http: Http,
        private loadingService: LoadingService,
        private toastrService: ToastrService,
        private router: Router,
        private domainService: DomainService) { }

    endPointUrl(path: string) {
        return `${this.domainService.get().api}${path}`;
    }

    createHeader(headers: Headers) {-
        headers.append('Content-Type', 'application/json');
    }
    createOptions(blob: boolean = false) {

        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Access-Control-Allow-Origin', '*');
        this.httpOptions = {
            headers: headers
        }

        if (!blob) return;
        headers.append('responseType', 'arraybuffer');

        this.httpOptions = {
            headers: headers,
            responseType: 'blob'
        }
    }

    get(url, useLoading = true): Observable<any> {
        this.startLoading(useLoading);
        this.createOptions();
        return this.httpClient.get(this.endPointUrl(url), this.httpOptions)
            .pipe(catchError(erro => this.handleError(erro)))
            .timeout(120000)
            .finally(() => this.stopLoading(useLoading));
    }

    getFullUrl(url, useLoading = true) {
        this.createOptions(false);
        this.startLoading(useLoading);
        return this.http.get(url)
            .map(response => response.json())
            .catch(error => this.handleError(error))
            .finally(() => this.stopLoading(useLoading));
    }

    postFullUrl(url, data, useLoading = true) {
        this.startLoading(useLoading);
        return this.http.post(url, null)
            .finally(() => this.stopLoading(useLoading));
    }

    
    post(url, data, useLoading = true) {
        return this.postNoMap(url, data, useLoading)
            .timeout(120000)
            .map(this.handleSuccess)
            .catch(error => this.handleError(error))
            .finally(() => this.stopLoading(useLoading));
    }

    postDownload(url, data, useLoading = true) {
        this.startLoading(useLoading);
        const headers = new Headers();
        this.createHeader(headers);

        headers.append('responseType', 'arraybuffer');

        const options = new RequestOptions({ headers: headers, responseType: ResponseContentType.Blob });
        return this.http.post(this.endPointUrl(url), JSON.stringify(data), options)
            .finally(() => this.stopLoading(useLoading));
    }

    getDownload(url, useLoading = true) {
        this.startLoading(useLoading);
        const headers = new Headers();
        this.createHeader(headers);

        headers.append('responseType', 'arraybuffer');

        const options = new RequestOptions({ headers: headers, responseType: ResponseContentType.Blob });
        return this.http.get(this.endPointUrl(url), options)
            .finally(() => this.stopLoading(useLoading));
    }

    getNoMap(url, useLoading = true) {
        this.startLoading(useLoading);
        const headers = new Headers();
        this.createHeader(headers);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.endPointUrl(url), options)
            .finally(() => this.stopLoading(useLoading));
    }

    postNoMap(url, data, useLoading = true) {
        this.startLoading(useLoading);
        const headers = new Headers();
        this.createHeader(headers);
        const options = new RequestOptions({ headers: headers });
        return this.http.post(this.endPointUrl(url), JSON.stringify(data), options)
            .finally(() => this.stopLoading(useLoading));
    }

    handleSuccess(response: Response) {
        //console.log('-- success --');
        console.log(response);
        let result: HttpResult = response.json();
        return result.resultado || {};        
    }

    handleError(response: Response) {
        let result: HttpResult = response.json();
        return Observable.throw(result.erros || [{ message: 'Ocorreu algum erro.' }]);
    }

    startLoading(useLoading): any {
        if (useLoading) {
            this.loadingService.start();
        }
    }

    stopLoading(useLoading) {
        if (useLoading) {
            this.loadingService.stop();
        }
    }
}
