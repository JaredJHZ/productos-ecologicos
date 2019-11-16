import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  items: object[] = [
    {
      nombre:'Inicio',
      ruta:'home'
    },
    {
      nombre:'Catálogo',
      ruta:'catalogo'
    },
    {
      nombre:'Acerca de',
      ruta:'acerca'
    }
  ];

  admin: Object[] = [
    {
      nombre:'Agregar proveedor',
      ruta:'agregar-proveedor'
    },
    {
      nombre:'Lista de proveedores',
      ruta:'lista-proveedores'
    },
    {
      nombre:"Agregar producto",
      ruta:'agregar-producto'
    }
  ]

  constructor() { }
}
