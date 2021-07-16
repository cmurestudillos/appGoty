import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Rutas
import { AppRoutingModule } from './routes/app-routing.module';
// Modulos componentes reutilizables/comunes
import { ComponentsModule } from './modules/components.module';
// Peticiones HTTP
import { HttpClientModule } from '@angular/common/http';
// Acceso al Backend - Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
// Componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { GotyComponent } from './components/goty/goty.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GotyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
