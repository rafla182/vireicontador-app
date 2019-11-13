import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AbrirEmpresaComponent } from './layouts/abrir-empresa/abrir-empresa.component';
import { MigrarEmpresaComponent } from './layouts/migrar-empresa/migrar-empresa.component';

const routes: Routes = [
    {
        path: 'abertura',
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
