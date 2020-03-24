import { Component, OnInit } from '@angular/core';
// Servicio
import { GameService } from 'src/app/services/game.service';
// Interface de datos
import { Game } from '../../interfaces/interfaces';
// Mensaje de alert
import Swal from 'sweetalert2';

@Component({
  selector: 'app-goty',
  templateUrl: './goty.component.html',
  styleUrls: ['./goty.component.css']
})
export class GotyComponent implements OnInit {

  juegos: Game[] = [];

  constructor( private _gameService: GameService) { }

  ngOnInit() {
    this._gameService.getNominados()
        .subscribe(data => {
          // console.log(data);
          this.juegos = data;
        });
  }

  votarJuego( juego: Game){
    this._gameService.votarJuego(juego.id)
        .subscribe((data:any) => {
          // console.log(data);
          if(data.ok === true){
            Swal.fire({
              title: 'Gracias',
              text: data.mensaje,
              icon: 'success',
            });
          }else{
            Swal.fire({
              title: 'Error',
              text: data.mensaje,
              icon: 'error',
            });
          }

        });
  }

}
