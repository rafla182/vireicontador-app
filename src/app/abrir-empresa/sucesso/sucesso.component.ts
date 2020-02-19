import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-sucesso',
    templateUrl: './sucesso.component.html',
    styleUrls: ['./sucesso.component.css']
})
export class SucessoComponent implements OnInit {
    @Input() tela;
    @Output() trocarTela: EventEmitter<string> = new EventEmitter();
    @Input() model: any;
    @Output() loadingSet: EventEmitter<string> = new EventEmitter();

    constructor(private toastr: ToastrService) { }

    ngOnInit() {
        setTimeout(() => {
            this.loadingSet.emit('false');
            this.toastr.success('O contrato assinado foi enviado por e-mail.');
        }, 1000);
    }

    

}
