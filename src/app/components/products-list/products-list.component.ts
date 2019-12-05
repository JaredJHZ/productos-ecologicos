import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { MatTableDataSource } from '@angular/material/table';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { InfoProductComponent } from '../info-product/info-product.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource;
  displayedColumns: string[] = ['id', 'name','vendedor','actions'];
  loading: boolean = false;
  products: any [] = [];

  constructor(public dialog:MatDialog, private catalogoService: CatalogoService, 
    private proveederService:ProveedorService, private router: Router) { 
    this.loading = true;
    this.catalogoService.getProducts().subscribe(
      (data) => {
        this.products = [];
        let lengthData = data.length;
        let  num = 0;
        data.forEach(
          (product: any) => {
            let vendedorId = product.payload.doc.data().vendedor;
            this.proveederService.getProvider(vendedorId)
                .subscribe(
                  (vendedor: any) => {
                    let nombreVendedor = vendedor.payload.data().nombre;
                    let nombreProducto = product.payload.doc.data().nombre;
                    let idProducto = product.payload.doc.id;
                    this.products.push({
                      vendedor:nombreVendedor,
                      nombre:nombreProducto,
                      id: idProducto
                    });
                    num+=1;
                    if (num === lengthData) {
                      this.dataSource = new MatTableDataSource<any>(this.products);
                      this.dataSource.paginator = this.paginator;
                      this.loading = false;
                    }
                  },
                )
          }
        )
      }
    )
  }

  ngOnInit() {

  }

  eliminar(id , name, vendedor) {
    const dialogRef = this.dialog.open(InfoProductComponent, {
      width: '400px',
      height:'380px',
      data: {
        id: id,
        nombre: name,
        vendedor: vendedor
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  editar(id) {
    this.router.navigate(['editar-producto', id]);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
