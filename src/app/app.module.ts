import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import {
    MatRadioButton, MatRadioGroup,
    MatButtonModule, MatRippleModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTooltipModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { DadosUsuarioComponent } from './abrir-empresa/dados-usuario/dados-usuario.component';
import { DadosEmpresaComponent } from './abrir-empresa/dados-empresa/dados-empresa.component';
import { EscolhaPlanoComponent } from './abrir-empresa/escolha-plano/escolha-plano.component';
import { PagamentoComponent } from './abrir-empresa/pagamento/pagamento.component';
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
import { OnlyNumber } from './directives/only-number.directive';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MigrarEmpresaComponent } from './layouts/migrar-empresa/migrar-empresa.component';
import { MigrarDadosUsuarioComponent } from './migrar-empresa/migrar-dados-usuario/migrar-dados-usuario.component';
import { MigrarDadosEmpresaComponent } from './migrar-empresa/migrar-dados-empresa/migrar-dados-empresa.component';
import { MigrarEscolhaPlanoComponent } from './migrar-empresa/migrar-escolha-plano/migrar-escolha-plano.component';
import { MigrarEmpresaService } from './layouts/migrar-empresa/migrar-empresa.services';
import { MigrarPagamentoComponent } from './migrar-empresa/migrar-pagamento/migrar-pagamento.component';
import { EstadosService } from './core/services/estadocidade.service';
import { SucessoComponent } from './abrir-empresa/sucesso/sucesso.component';
import { NgxLoadingModule } from 'ngx-loading';

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
        ToastrModule.forRoot(),
        NgxLoadingModule.forRoot({})
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        AbrirEmpresaComponent,
        MigrarEmpresaComponent,
        DadosUsuarioComponent,
        DadosEmpresaComponent,
        EscolhaPlanoComponent,
        PagamentoComponent,
        SucessoComponent,
        MigrarDadosUsuarioComponent,
        MigrarDadosEmpresaComponent,
        MigrarEscolhaPlanoComponent,
        MigrarPagamentoComponent,
        OnlyNumber

    ],
    providers: [HttpService, AbrirEmpresaService, MigrarEmpresaService, LoadingService, EstadosService],
    bootstrap: [AppComponent]
})
export class AppModule { }
