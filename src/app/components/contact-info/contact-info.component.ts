import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent implements OnInit {

  proveedor:any;
  loading: boolean = true;

  constructor( public dialogRef: MatDialogRef<ContactInfoComponent>,  @Inject(MAT_DIALOG_DATA) public data: any, private proveederService:ProveedorService, private router:Router) {
      this.loading = true;
      this.proveederService.getProvider(this.data.id).subscribe(
        (data) => {
          this.proveedor = data.payload.data();
          this.loading = false;
        }
      )
   }

   irProducto(id) {
    this.router.navigate(['producto',id]);
    this.cancelar();
   }

   cancelar() {
    this.dialogRef.close();
  }

  ngOnInit() {
  }
}
