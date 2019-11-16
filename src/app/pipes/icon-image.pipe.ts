import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iconImage'
})
export class IconImagePipe implements PipeTransform {

  transform(name: string): string {
    return this.getIconImage(name);
  }

  getIconImage(name: string): string {
    switch(name) {
      case 'Catálogo':
        return 'book'
      case 'Proveedor':
        return 'account_circle';
      case 'Lista de proveedores':
        return 'face'
      case 'Agregar producto':
        return 'note_add'
      case 'Acerca de':
        return 'info'
      default:
        return 'home';
    }
  }

}
