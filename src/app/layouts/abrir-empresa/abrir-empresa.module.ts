import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AbrirEmpresaRoutes } from './abrir-empresa.routing';
import { AbrirEmpresaService } from './abrir-empresa.services';
;

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(AbrirEmpresaRoutes),
        ReactiveFormsModule
    ],
    declarations: [
    ],
    providers: [        
    ]
})

export class AbrirEmpresaModule { }
