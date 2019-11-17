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

   public deleteProductsFromProvider(id) {
     this.firestore.collection('products').snapshotChanges().subscribe(
       (products) => {
         products.forEach(
           (product: any) => {
             let productId = product.payload.doc.id;
             if (product.payload.doc.data().vendedor === id) {
               this.firestore.collection('products').doc(productId).delete()
                  .then(
                    () => {}
                  )
             }
           }
         )
       }
     )
   }

   public deleteProduct(id) {
      return this.firestore.collection('products').doc(id).delete();
   }
}
