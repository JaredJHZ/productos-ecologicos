import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProveedorService } from 'src/app/services/proveedor.service';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<ContactInfoComponent>,  @Inject(MAT_DIALOG_DATA) public data: any, private proveederService:ProveedorService) {
      this.proveederService.getProvider(this.data.id).subscribe(
        (data) => console.log(data.payload.data())
      )
   }

  ngOnInit() {
  }
}
