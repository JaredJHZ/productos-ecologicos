import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { ProveedorService } from 'src/app/services/proveedor.service';

@Component({
  selector: 'app-selection-popup',
  templateUrl: './selection-popup.component.html',
  styleUrls: ['./selection-popup.component.css']
})
export class SelectionPopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SelectionPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public catalogoService: CatalogoService,
    public providerService: ProveedorService) {
      
     }

  ngOnInit() {
  }

  cancelar() {
    this.dialogRef.close();
  }

  eliminar() {
    this.providerService.deleteProvider(this.data.id)
        .then(
          (ok) => {
            this.catalogoService.deleteProductsFromProvider(this.data.id);
            this.cancelar();
          }
        )
  }



}
