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
  user:string;

  constructor(public loginService:LoginService) { }


  ngOnInit() {
    this.isLogin = this.loginService.loginFlow.subscribe(
      (data) => this.user = data
    )
  }

  
  abrirMenu(event) {
    this.opened = !this.opened;
  }




}
