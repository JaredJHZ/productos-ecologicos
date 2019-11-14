import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

  

  constructor(private firestore: AngularFirestore) {

    }    

   public getProducts() {
     return this.firestore.collection('products').snapshotChanges();
   }

   public addProduct(data) {
    return this.firestore.collection('products').add(data);
   }
}
