import { Component, OnInit , Input} from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { LoginService } from 'src/app/services/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input()
  user:any;

  private isLogin: Subscription = null;

  
  items: object[];

  managers: any[]= [];

  constructor(private menuService:MenuService, private loginService:LoginService) {
    let permission = localStorage.getItem('permission');
    if (permission === 'manager') {
      this.items = this.menuService.admin;
    } else {
      this.items = this.menuService.items;
    }

    this.loginService.getManagers().subscribe(
      (managers) => {
        managers.forEach((manager:any) => {
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

  ngOnInit() {
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

}
