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
      nombre:'proveedor',
      ruta:'agregar-proveedor'
    },
    {
      nombre:'lista de proveedores',
      ruta:'lista-proveedores'
    },
    {
      nombre:"Agregar producto",
      ruta:'agregar-producto'
    },
    {
      nombre:'acerca de',
      ruta:'acerca'
    }
  ];

  constructor() { }
}
