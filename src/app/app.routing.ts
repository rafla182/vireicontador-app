import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AbrirEmpresaComponent } from './layouts/abrir-empresa/abrir-empresa.component';

const routes: Routes = [
   {
        path: '',
        component: AbrirEmpresaComponent,
        children: [{
            path: '',
            loadChildren: './layouts/abrir-empresa/abrir-empresa.module#AbrirEmpresaModule'
        }]
    },
    {
        path: 'migrar',
        component: AbrirEmpresaComponent,
        children: [{
            path: '',
            loadChildren: './layouts/abrir-empresa/abrir-empresa.module#AbrirEmpresaModule'
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
