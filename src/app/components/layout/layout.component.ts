import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { LoginService } from 'src/app/services/login.service';
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

  constructor(public loginService:LoginService) { }


  ngOnInit() {

    this.user = this.loginService.getSession();
    
    this.isLogin = this.loginService.loginFlow.subscribe(
      (data:any) => this.user = data
    )

    
  }

  
  abrirMenu(event) {
    this.opened = !this.opened;
  }




}
