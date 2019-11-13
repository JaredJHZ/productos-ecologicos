import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Output()
  abrirMenu = new EventEmitter<boolean>();
  
  abierto:boolean = false;

  @Input()
  user:string;

  items: object[];

  constructor(private loginService:LoginService, private menuService:MenuService) {
    this.items = this.menuService.items;
  }

  
  abrirMenuHandler() {
    this.abierto = !this.abierto;
    this.abrirMenu.emit(true);
  }

  cerrarSesionHandler() {
    this.loginService.logout();
  }


  ngOnInit() {
    this.user = this.loginService.getUsername();
  }

}
