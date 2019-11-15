import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  usuario:string = '';
  private isLogin = new Subject<any>();
  public loginFlow = this.isLogin.asObservable();



  constructor(public afAuth: AngularFireAuth) { }

  
  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(
      (data)=> {
        this.isLogin.next(data.user);
        this.saveSession(data.user);
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

  saveSession(user) {
    let savedUser = JSON.stringify(user);
    localStorage.setItem('user', savedUser);
  }

  getSession() {
    let user = localStorage.getItem('user');
    user = JSON.parse(user);
    return user;
  }

  deleteSession() {
    localStorage.clear();
  }
}
