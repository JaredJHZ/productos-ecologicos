import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  items: object[] = [
    {
      nombre:'inicio',
      ruta:'home'
    },
    {
      nombre:'catálogo',
      ruta:'catalogo'
    },
    {
      nombre:'proovedor',
      ruta:'agregar-proveedor'
    },
    {
      nombre:'acerca de',
      ruta:'acerca'
    }
  ];

  constructor() { }
}
