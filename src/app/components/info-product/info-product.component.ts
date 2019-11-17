import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectionPopupComponent } from '../selection-popup/selection-popup.component';
import { CatalogoService } from 'src/app/services/catalogo.service';

@Component({
  selector: 'app-info-product',
  templateUrl: './info-product.component.html',
  styleUrls: ['./info-product.component.css']
})
export class InfoProductComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SelectionPopupComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private catalogoService: CatalogoService) { }

  ngOnInit() {
  }

  cancelar() {
    this.dialogRef.close();
  }

  eliminar() {
    this.catalogoService.deleteProduct(this.data.id)
        .then(
          (data) => {
            this.cancelar();
          }
        )
  }


}
