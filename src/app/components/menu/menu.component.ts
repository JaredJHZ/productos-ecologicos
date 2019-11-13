import { Component, OnInit , Input} from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input()
  user:string;

  
  items: object[];

  constructor(private menuService:MenuService, private loginService:LoginService) {
    this.items = this.menuService.items;
   }

  ngOnInit() {
  }

  cerrarSesionHandler() {
    this.loginService.logout();
  }

}
