import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { ArchivosService } from 'src/app/services/archivos.service';
import { CatalogoService } from 'src/app/services/catalogo.service';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {

  providers: any[] = [];
  archivo: any;
  mensajeArchivo:string;
  nombreArchivo:string;
  porcentaje = 0;
  finalizado: boolean = true;
  url:string;

  constructor(private proveedoresService: ProveedorService, private archivosService:ArchivosService, private productosService: CatalogoService) {
    this.proveedoresService.getProviders().subscribe(
      (data) => {
        data.forEach(
          (provider:any) => this.providers.push({
            id:provider.payload.doc.id,
            name:provider.payload.doc.data().nombre,
            email: provider.payload.doc.data().email,
            phone: provider.payload.doc.data().telefono
          })
        );
   });
  }

  
  public productForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    costo: new FormControl('', Validators.required),
    vendedor: new FormControl('', Validators.required),
    membresia: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required)
  });


  addImage(event) {
    this.mensajeArchivo = `Archivo preparado ${event.target.files[0].name}`;
    this.archivo = event.target.files[0];
    this.nombreArchivo = event.target.files[0].name;

  }

  uploadImageAndData() {
    
    this.finalizado = false;

    let data = {
      ...this.productForm.value
    }
    this.productosService.addProduct(data).then(
      (value) =>  {
        this.archivosService.subirArchivoPrincipal(this.nombreArchivo, this.archivo,value.id)
        .then(
          (url) => {
            this.productosService.updateProduct(value.id, {
              imagenPrincipal: url
            });
            this.finalizado = true;
          }
        )
      }
)


  }

  ngOnInit() {
  }

}
