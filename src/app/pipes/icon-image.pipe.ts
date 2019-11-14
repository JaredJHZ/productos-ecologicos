import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iconImage'
})
export class IconImagePipe implements PipeTransform {

  transform(name: string): string {
    console.log(name)
    return this.getIconImage(name);
  }

  getIconImage(name: string): string {
    switch(name) {
      case 'catálogo':
        return 'book'
      case 'proveedor':
        return 'account_circle';
      case 'lista de proveedores':
        return 'face'
      case 'Agregar producto':
        return 'note_add'
      case 'acerca de':
        return 'info'
      default:
        return 'home';
    }
  }

}
