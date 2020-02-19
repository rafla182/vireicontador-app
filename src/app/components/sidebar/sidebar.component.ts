import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    // // { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
    // { path: '/dados-usuario', title: 'Dados Usuário', icon: 'person', class: '' },
    // { path: '/dados-empresa', title: 'Dados Empresa', icon: 'home', class: '' },
    // { path: '/escolha-plano', title: 'Escolha Plano', icon: 'assignment', class: '' },
    // { path: '/pagamento', title: 'Pagamento', icon: 'attach_money', class: '' }
];


@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    menuItems: any[];
    @Input() tela: any;
    @Output() trocarTela: EventEmitter<string> = new EventEmitter();

    constructor() { }

    ngOnInit() {
        console.log(this.tela);
        //this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    trocarTelaProxima(tela) {
        this.trocarTela.emit(tela);
    }

}
