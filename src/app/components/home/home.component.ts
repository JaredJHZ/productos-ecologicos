import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Output()
  abrirMenu = new EventEmitter<boolean>();
  
  constructor(public loginService:LoginService) { 
    
  }

  ngOnInit() {
  }

  login() {
    this.loginService.login();
  }

}
