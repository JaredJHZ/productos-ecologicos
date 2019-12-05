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

   public getProduct(id) {
    return this.firestore.collection('products').doc(id).snapshotChanges();
  }

  public updateProduct(id, data) {
    return this.firestore.collection('products').doc(id).update(data);
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

   public getComments() {
    return this.firestore.collection('comentarios').snapshotChanges();
  }

  public addComment(producto,comentario, usuario) {
    return this.firestore.collection('comentarios').add({producto:producto, comentario:comentario, usuario:usuario});
   }

   public addReaction(producto, reaccion, usuario) {
     return new Promise((resolve, reject) => {
        this.firestore.collection('reacciones').ref.where("usuario","==",usuario).get().then(
          (docs) => {
            docs.forEach(
              (doc) => this.firestore.collection('reacciones').doc(doc.id).delete().then(()=>{})
            )
            resolve(this.firestore.collection('reacciones').add({producto:producto, reaccion:reaccion, usuario:usuario}));
          } 
        ).catch(
          () => resolve(this.firestore.collection('reacciones').add({producto:producto, reaccion:reaccion, usuario:usuario}))
        )
        
      })

     }
 

   public getReaction(usuario) {
    return this.firestore.collection('reacciones').ref.where("usuario","==",usuario);
  }

  public getPositiveReaction(producto) {
    return new Promise((resolve, reject) => {
      this.firestore.collection('reacciones').ref.where('producto' , '==', producto)
          .get()
          .then(
            (docs) => {

              let total = 0;
              let positivos = 0;
              docs.forEach(
                (doc) => {
                  total +=1;
                  positivos += doc.data().reaccion === 'si' ? 1 : 0; 
                }
              )

              resolve(positivos * 100 / total)
            }
          )
    })
  }
}
