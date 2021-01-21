import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Componentes
import { HomeComponent } from '../components/home/home.component';
import { GotyComponent } from '../components/goty/goty.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'goty', component: GotyComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
