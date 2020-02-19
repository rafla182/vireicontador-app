import { Component, OnInit, Input } from '@angular/core';
import { Location, PopStateEvent } from '@angular/common';
import 'rxjs/add/operator/filter';
import { Router, NavigationEnd, NavigationStart, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import PerfectScrollbar from 'perfect-scrollbar';
import * as $ from "jquery";
import { AbrirEmpresaService } from '../abrir-empresa/abrir-empresa.services';

@Component({
    selector: 'app-migrar-empresa',
    templateUrl: './migrar-empresa.component.html',
    styleUrls: ['./migrar-empresa.component.scss']
})
export class MigrarEmpresaComponent implements OnInit {
    private _router: Subscription;
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];

    @Input() tela = 'contrato';
    model: any = {};
    planos: any = [];
    show = false;
    constructor(public location: Location, private router: Router, private route: ActivatedRoute, private abrirEmpresaService: AbrirEmpresaService) { }

    ngOnInit() {

        this.model.empresa = {};
        this.model.socios = [];
        this.model.cartaoCredito = {};
        this.model.assinatura = {};
        this.model.competencia = {};

        this.route.queryParams.subscribe(params => {
            this.model.empresa.email = params.email;
            this.show = true;

            this.abrirEmpresaService.pegarPlano(this.model.empresa.email).subscribe(response => {
                console.log(response);

                this.planos = [
                    { nome: 'Serviço Ouro - R$ 119,99', id: 145899, produtoId: 554689 },
                    { nome: 'Serviço Platina - R$ 249,99', id: 145902, produtoId: 554691 },
                    { nome: 'Serviço Diamante - R$ 359,99', id: 145903, produtoId: 554692 },
                    { nome: 'Simples Varejista Diamante - R$ 359,99', id: 107099, produtoId: 447431 },
                    { nome: 'Presumido - R$ 249,99', id: 25016, produtoId: 556237 },
                    { nome: 'Igreja - R$ 249,99', id: 146435, produtoId: 556229 },
                    { nome: 'MEI - R$ 99,99', id: 107829, produtoId: 460091 },
                    // { nome: 'Serviço Ouro', id: 11330, produtoId: 30897 }
                    // { nome: 'Serviço Ouro', id: 11330, produtoId: 30897 }
                ];

                console.log(this.model.assinatura.descricao);

                this.model.assinatura.valor = response.resultado.valor;
                this.model.assinatura.descricao = response.resultado.descricao;
                this.model.empresa.nome = response.resultado.nome;
                this.model.empresa.funcionarios = response.resultado.funcionarios;

                var planoSelect = this.planos.find(p => p.nome.includes(this.model.assinatura.descricao));
                this.model.assinatura.id = planoSelect.id;
                this.model.assinatura.produtoId = planoSelect.produtoId;

                this.show = false;
            });
        });

        const isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

        if (isWindows && !document.getElementsByTagName('body')[0].classList.contains('sidebar-mini')) {
            // if we are on windows OS we activate the perfectScrollbar function

            document.getElementsByTagName('body')[0].classList.add('perfect-scrollbar-on');
        } else {
            document.getElementsByTagName('body')[0].classList.remove('perfect-scrollbar-off');
        }
        const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
        const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');

        this.location.subscribe((ev: PopStateEvent) => {
            this.lastPoppedUrl = ev.url;
        });

        this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationStart) {
                if (event.url != this.lastPoppedUrl)
                    this.yScrollStack.push(window.scrollY);
            } else if (event instanceof NavigationEnd) {
                if (event.url == this.lastPoppedUrl) {
                    this.lastPoppedUrl = undefined;
                    window.scrollTo(0, this.yScrollStack.pop());
                } else
                    window.scrollTo(0, 0);
            }
        });
        this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
            elemMainPanel.scrollTop = 0;
            elemSidebar.scrollTop = 0;
        });
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            let ps = new PerfectScrollbar(elemMainPanel);
            ps = new PerfectScrollbar(elemSidebar);
        }

        const window_width = $(window).width();
        let $sidebar = $('.sidebar');
        let $sidebar_responsive = $('body > .navbar-collapse');
        let $sidebar_img_container = $sidebar.find('.sidebar-background');


        if (window_width > 767) {
            if ($('.fixed-plugin .dropdown').hasClass('show-dropdown')) {
                $('.fixed-plugin .dropdown').addClass('open');
            }

        }

        $('.fixed-plugin a').click(function (event) {
            // Alex if we click on switch, stop propagation of the event, so the dropdown will not be hide, otherwise we set the  section active
            if ($(this).hasClass('switch-trigger')) {
                if (event.stopPropagation) {
                    event.stopPropagation();
                }
                else if (window.event) {
                    window.event.cancelBubble = true;
                }
            }
        });

        $('.fixed-plugin .badge').click(function () {
            let $full_page_background = $('.full-page-background');


            $(this).siblings().removeClass('active');
            $(this).addClass('active');

            var new_color = $(this).data('color');

            if ($sidebar.length !== 0) {
                $sidebar.attr('data-color', new_color);
            }

            if ($sidebar_responsive.length != 0) {
                $sidebar_responsive.attr('data-color', new_color);
            }
        });

        $('.fixed-plugin .img-holder').click(function () {
            let $full_page_background = $('.full-page-background');

            $(this).parent('li').siblings().removeClass('active');
            $(this).parent('li').addClass('active');



        });
    }
    ngAfterViewInit() {
        this.runOnRouteChange();
    }

    runOnRouteChange(): void {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
            const ps = new PerfectScrollbar(elemMainPanel);
            ps.update();
        }
    }
    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }

    trocarTelaProxima(tela) {
        this.tela = tela;
    }

    loadingSetProx(loading) {
        var isTrueSet = (loading === 'true');
        this.show = isTrueSet;
    }
}
