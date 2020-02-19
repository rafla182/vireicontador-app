import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MigrarSidebarComponent } from './migrar-sidebar/migrar-sidebar.component';
import { LoadingComponent } from './loading/loading.component';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgxLoadingModule.forRoot({})
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    MigrarSidebarComponent,
    LoadingComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    MigrarSidebarComponent, 
    LoadingComponent
  ]
})
export class ComponentsModule { }
