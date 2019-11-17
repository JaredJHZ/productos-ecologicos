import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { MatTableDataSource } from '@angular/material/table';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { InfoProductComponent } from '../info-product/info-product.component';

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
    private proveederService:ProveedorService) { 
    this.loading = true;
    this.catalogoService.getProducts().subscribe(
      (data) => {
        this.products = [];
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
                  }
                )
          }
        )
        this.loading = false;
        this.dataSource = new MatTableDataSource<any>(this.products);
        this.dataSource.paginator = this.paginator;
      }
    )
  }

  ngOnInit() {

  }

  eliminar(id , name, vendedor) {
    const dialogRef = this.dialog.open(InfoProductComponent, {
      width: '400px',
      data: {
        id: id,
        nombre: name,
        vendedor: vendedor
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

}
