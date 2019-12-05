import { Injectable } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
@Injectable({
  providedIn: 'root'
})
export class ArchivosService {

  constructor(private storage: AngularFireStorage) { }

  public subirArchivoPrincipal(nombreArchivo: string, datos: any, id) {
    return new Promise((resolve, reject) => {
      this.storage.upload(`imagenes/${id}/principal/${nombreArchivo}`, datos).then(
        (data) => {
          if(data.state === 'success') {
            this.storage.ref(`imagenes/${id}/principal/${nombreArchivo}`).getDownloadURL()
                .subscribe(
                  (url) => {
                    resolve(url);
                  }
                )
          }
        }
      ).catch(e => console.log(e))
    });
  }


  public subirArchivoSecundario(nombreArchivo: string, datos: any, id) {
    return new Promise((resolve, reject) => {
      this.storage.upload(`imagenes/${id}/carrusel/${nombreArchivo}`, datos).then(
        (data) => {
          if (data.state === 'success') {
            this.storage.ref(`imagenes/${id}/carrusel/${nombreArchivo}`)
              .getDownloadURL()
              .subscribe(
                (url) => {
                  resolve(url);
                }
              )
          }
        }
      )
    })  
  }
}
