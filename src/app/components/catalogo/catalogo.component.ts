import { Component, OnInit } from '@angular/core';
import { CatalogoService } from 'src/app/services/catalogo.service';
import {DomSanitizer} from '@angular/platform-browser';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ContactInfoComponent } from '../contact-info/contact-info.component';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  products:any[] = [];
  allProducts: any[] = [];
  pageEvent: PageEvent;
  loading: boolean;


  constructor(private catalogoService:CatalogoService , private sanitizer: DomSanitizer, public dialog:MatDialog) { }

  ngOnInit() {
    this.loading = true;
    this.catalogoService.getProducts().subscribe(
      (products) => {
        products.forEach((productData: any) => {
          this.allProducts.push({
            id:productData.payload.doc.id,
            data: productData.payload.doc.data()
          })
        })
        this.changeProducts(0 , 4);
        this.loading = false
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

  openContactInfo(data) {
    console.log(data);
    let info = data.data;
    const dialogRef = this.dialog.open(ContactInfoComponent, {
      width: '400px',
      data: {
        id: info.vendedor,
        img: info.imagen
      }
    })
  }

  buscar(event:string) {
    if (event === '' || event.length <=0) {
      this.changeProducts(0,4);
    } else {
      this.products = this.allProducts.filter((value) => value.data.nombre.toUpperCase().includes(event.toUpperCase()))
    }
  }



}
