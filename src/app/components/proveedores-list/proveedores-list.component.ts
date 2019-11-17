import { Component, OnInit, ViewChild } from '@angular/core';
import { ProveedorService } from 'src/app/services/proveedor.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { SelectionPopupComponent } from '../selection-popup/selection-popup.component';

@Component({
  selector: 'app-proveedores-list',
  templateUrl: './proveedores-list.component.html',
  styleUrls: ['./proveedores-list.component.css']
})
export class ProveedoresListComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  providers: any [] = [];
  dataSource;
  displayedColumns: string[] = ['id', 'name' ,'email', 'phone', 'actions'];
  loading: boolean = false;

  constructor(private proveedoresService: ProveedorService, 
    public dialog:MatDialog) { }

  ngOnInit() {
    this.getProviders();
  }

  getProviders() {
    this.loading = true;
    this.proveedoresService.getProviders().subscribe(
      (data) => {
        this.providers = [];
        data.forEach(
          (provider:any) => this.providers.push({
            id:provider.payload.doc.id,
            name:provider.payload.doc.data().nombre,
            email: provider.payload.doc.data().email,
            phone: provider.payload.doc.data().telefono
          })
        )
        this.loading = false;
        this.dataSource = new MatTableDataSource<any>(this.providers);
        this.dataSource.paginator = this.paginator;
      }
    )
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminar(id, name) {
    const dialogRef = this.dialog.open(SelectionPopupComponent, {
      width: '400px',
      data: {
        id: id,
        nombre: name
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

}