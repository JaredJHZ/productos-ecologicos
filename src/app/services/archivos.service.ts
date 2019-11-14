import { Injectable } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
@Injectable({
  providedIn: 'root'
})
export class ArchivosService {

  constructor(private storage: AngularFireStorage) { }

  public subirArchivo(nombreArchivo: string, datos: any) {
    return this.storage.upload(nombreArchivo, datos);
  }

  public referenciaArchivo(nombreArchivo: string) {
    return this.storage.ref(nombreArchivo);
  }
}
