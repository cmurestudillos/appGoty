import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Rutas
import { AppRoutingModule } from '../../app/app-routing.module';
// Componentes
import { NavbarComponent } from '../components/shared/navbar/navbar.component';
import { FooterComponent } from '../components/shared/footer/footer.component';
import { GraficoComponent } from '../components/shared/grafico/grafico.component';
// Graficos
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    GraficoComponent
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    GraficoComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    NgxChartsModule,
    BrowserAnimationsModule
  ]
})
export class ComponentsModule { }
