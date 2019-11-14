import { Component, OnInit, ViewChild } from '@angular/core';
import { ProveedorService } from 'src/app/services/proveedor.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-proveedores-list',
  templateUrl: './proveedores-list.component.html',
  styleUrls: ['./proveedores-list.component.css']
})
export class ProveedoresListComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  providers: any [] = [];
  dataSource;
  displayedColumns: string[] = ['id', 'name' ,'email', 'phone'];

  constructor(private proveedoresService: ProveedorService) { }

  ngOnInit() {
    this.proveedoresService.getProviders().subscribe(
      (data) => {
        data.forEach(
          (provider:any) => this.providers.push({
            id:provider.payload.doc.id,
            name:provider.payload.doc.data().nombre,
            email: provider.payload.doc.data().email,
            phone: provider.payload.doc.data().telefono
          })
        )
        this.dataSource = new MatTableDataSource<any>(this.providers);
        this.dataSource.paginator = this.paginator;
      }
    )
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}