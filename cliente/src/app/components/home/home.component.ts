import { Component, OnInit } from '@angular/core';
// Servicio de BBDD
import { AngularFirestore } from '@angular/fire/firestore';
// Operadores
import { map } from 'rxjs/operators';
// Interfaz de datos
import { Game } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  juegos: any[] = [];

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    this.db.collection('goty').valueChanges()
            .pipe(map((data:Game[]) => {
              return data.map(({nombre, votos}) => ({
                name: nombre,
                value: votos
              }))
            }))
            .subscribe( data => {
              // console.log(juegos);
              this.juegos = data;
            });
  }

}
