import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { MenuService } from 'src/app/services/menu.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  private isLogin: Subscription = null;


  @Output()
  abrirMenu = new EventEmitter<boolean>();
  
  abierto:boolean = false;

  @Input()
  user:any;

  items: object[];

  managers: any[]= [];

  constructor(private loginService:LoginService, private menuService:MenuService) {

    let permission = localStorage.getItem('permission');
    if (permission === 'manager') {
      this.items = this.menuService.admin;
    } else {
      this.items = this.menuService.items;
    }

    this.loginService.getManagers().subscribe(
      (managers) => {
        managers.forEach((manager:any) => {
          console.log(manager);
          this.managers.push(manager.payload.doc.data().email);
        } )
        this.isLogin = this.loginService.loginFlow.subscribe(
          (data:any) => {
            if (data) {
              let isAdmin = this.isAdmin(data.email);
              if (isAdmin) {
                this.items = this.menuService.admin;
              }
            } else {
              this.items = this.menuService.items;
            }
          }
        )
      }
    )



 
  }

  
  abrirMenuHandler() {
    this.abierto = !this.abierto;
    this.abrirMenu.emit(true);
  }

  cerrarSesionHandler() {
    this.loginService.logout();
    this.loginService.deleteSession();
  }

  isAdmin (email) {
    for(let manager of this.managers) {
      if (email === manager) {
        return true;
      }
    }
    return false;
  }


  ngOnInit() {

  }

}
