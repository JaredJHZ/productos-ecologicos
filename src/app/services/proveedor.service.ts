import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(private firestore:AngularFirestore) { }

 

  public createProvider(data: any) {
    return this.firestore.collection('providers').add(data);
  }

  public getProviders() {
    return this.firestore.collection('providers').snapshotChanges();
  }

  public getProvider(id) {
    return this.firestore.collection('providers').doc(id).snapshotChanges();
  }

  public deleteProvider(id) {
    return this.firestore.collection('providers').doc(id).delete();
  }

  public updateProvider(id,data) {
    return this.firestore.collection('providers').doc(id).update(data);
  }
}
