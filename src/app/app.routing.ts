import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AbrirEmpresaComponent } from './layouts/abrir-empresa/abrir-empresa.component';
import { MigrarEmpresaComponent } from './layouts/migrar-empresa/migrar-empresa.component';
import { EscolhaComponent } from './layouts/escolha/escolha.component';

const routes: Routes = [
    {
        path: 'abrir',
        component: AbrirEmpresaComponent,
        children: [{
            path: '',
            loadChildren: './layouts/abrir-empresa/abrir-empresa.module#AbrirEmpresaModule'
        }]
    },
    {
        path: 'migrar',
        component: MigrarEmpresaComponent,
        children: [{
            path: '',
            loadChildren: './layouts/migrar-empresa/migrar-empresa.module#MigrarEmpresaModule'
        }]
    }
    ,
    {
        path: 'escolha',
        component: EscolhaComponent,
        children: [{
            path: '',
            loadChildren: './layouts/escolha/escolha.module#EscolhaModule'
        }]
    }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes, {
            useHash: true
        })
    ],
    exports: [
    ],
})
export class AppRoutingModule { }
