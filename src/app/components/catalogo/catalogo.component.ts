import { Component, OnInit } from '@angular/core';
import { CatalogoService } from 'src/app/services/catalogo.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  products:any[] = [];


  constructor(private catalogoService:CatalogoService , private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.catalogoService.getProducts().subscribe(
      (products) => {
        products.forEach((productData: any) => {
          this.products.push({
            id:productData.payload.doc.id,
            data: productData.payload.doc.data()
          })
        })
      }
    )
  }

  photoURL(url) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
