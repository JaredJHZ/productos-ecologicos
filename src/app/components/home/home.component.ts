import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('leftRight', [
      // ...
      state('start', style({
        left:'-10vw'
      })),
      state('stop', style({
        left:'5vw'
      })),
      transition('start => stop', [
        animate('1s')
      ]),
      transition('stop => start', [
        animate('1s')
      ]),
    ]),
    trigger('RightLeft', [
      // ...
      state('start', style({
        right:'-10vw'
      })),
      state('stop', style({
        right:'5vw'
      })),
      transition('start => stop', [
        animate('1s')
      ]),
      transition('stop => start', [
        animate('1s')
      ]),
    ])
 
  ]
})
export class HomeComponent implements OnInit {

  @Output()
  abrirMenu = new EventEmitter<boolean>();

  bookAnimation:string ='start';
  contentAnimation:string = 'start';
  
  constructor(public loginService:LoginService, private router:Router) { 
    
  }

  ngOnInit() {
    setTimeout(() => {
      this.bookAnimation = 'stop';
      this.contentAnimation = 'stop';
    }, 500);
  }

  irCatalogo() {
    this.router.navigate(['catalogo']);
  }

  irContacto() {
    this.router.navigate(['contacto']);
  }
 

}
