import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  usuario:string = '';
  private isLogin = new Subject<string>();
  public loginFlow = this.isLogin.asObservable();



  constructor(public afAuth: AngularFireAuth) { }

  
  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(
      (data)=> {
        this.isLogin.next(data.user.displayName);
      }
    );
  }

  logout() {
    this.afAuth.auth.signOut();
    this.isLogin.next('');
  }

  getUsername(): string {
    return this.usuario;
  }
}
