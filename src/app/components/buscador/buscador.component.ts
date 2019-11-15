import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {

  palabra:string;

  @Output()
  buscar = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  escribir(event) {
    this.buscar.emit(this.palabra);
  }

}
