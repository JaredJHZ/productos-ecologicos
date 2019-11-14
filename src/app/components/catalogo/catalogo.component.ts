import { Component, OnInit } from '@angular/core';
import { CatalogoService } from 'src/app/services/catalogo.service';
import {DomSanitizer} from '@angular/platform-browser';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  products:any[] = [];
  allProducts: any[] = [];
  pageEvent: PageEvent;


  constructor(private catalogoService:CatalogoService , private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.catalogoService.getProducts().subscribe(
      (products) => {
        products.forEach((productData: any) => {
          this.allProducts.push({
            id:productData.payload.doc.id,
            data: productData.payload.doc.data()
          })
        })
        this.changeProducts(0 , 4);
      }
    )
  }

  photoURL(url) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  changePage(event) {
    console.log(event);
    let maxNumber = (event.pageIndex+1) * 4;
    let minNumber = maxNumber - 4;
    this.changeProducts(minNumber, maxNumber);

  }

  changeProducts(minNumber: number, maxNumber:number) {
    this.products = this.allProducts.filter((product, index) =>  index >= minNumber && index < maxNumber);
  }



}
