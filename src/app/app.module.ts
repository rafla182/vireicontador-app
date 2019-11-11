import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {
    MatRadioButton, MatRadioGroup,
    MatButtonModule, MatRippleModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTooltipModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { DadosUsuarioComponent } from './dados-usuario/dados-usuario.component';
import { DadosEmpresaComponent } from './dados-empresa/dados-empresa.component';
import { EscolhaPlanoComponent } from './escolha-plano/escolha-plano.component';
import { PagamentoComponent } from './pagamento/pagamento.component';
import { AbrirEmpresaComponent } from './layouts/abrir-empresa/abrir-empresa.component';
import { CpfCnpjModule } from 'ng2-cpf-cnpj';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { AbrirEmpresaService } from './layouts/abrir-empresa/abrir-empresa.services';
import { HttpService } from './core/services/http.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoadingService } from './core/services/loading.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from './core/components/ng2-bs4-modal/lib/ng2-bs4-modal.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        NgSelectModule, 
        ReactiveFormsModule,
        HttpModule,
        ComponentsModule,
        RouterModule,
        HttpClientModule,
        AppRoutingModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        CpfCnpjModule,
        NgxMaskModule.forRoot(), ToastrModule.forRoot(),
        AgmCoreModule.forRoot({
            apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
        }),
        ModalModule,
        Ng2SearchPipeModule,
        ToastrModule.forRoot()
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        AbrirEmpresaComponent,
        DadosUsuarioComponent,
        DadosEmpresaComponent,
        EscolhaPlanoComponent,
        PagamentoComponent

    ],
    providers: [HttpService, AbrirEmpresaService, LoadingService],
    bootstrap: [AppComponent]
})
export class AppModule { }
