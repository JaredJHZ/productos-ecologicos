import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { LoginService } from 'src/app/services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  
  private isLogin: Subscription = null;

  events: string[] = [];
  opened: boolean;
  user:any;

  mode = new FormControl('push');


  constructor(public loginService:LoginService) {

   }


  ngOnInit() {

    this.user = this.loginService.getSession();
    
    this.isLogin = this.loginService.loginFlow.subscribe(
      (data:any) => {
        this.user = data;
        this.loginService.isManager(data.email).then(
          (data) => {
            let permission = 'manager';
            localStorage.setItem('permission',permission);
          }
        ).catch(() => localStorage.setItem('permission', 'user'))
      }
    )

    
  }

  
  abrirMenu(event) {
    this.opened = !this.opened;
  }




}
