import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { ArchivosService } from 'src/app/services/archivos.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {

  providers: any[] = [];
  archivo: any;
  mensajeArchivo:string;
  nombreArchivo:string;
  porcentaje = 0;
  finalizado: boolean = true;
  url:string;
  id: string;

  private loading:boolean = true;

  public productForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    costo: new FormControl('', Validators.required),
    vendedor: new FormControl('', Validators.required),
    membresia: new FormControl('', Validators.required),
    imagen: new FormControl('')
  });


  constructor(private activatedRoute: ActivatedRoute, private catalogoService: CatalogoService,
    private proveedoresService: ProveedorService, private router: Router, private archivosService:ArchivosService) { 
    this.activatedRoute.params.subscribe(
      (params) => {
        this.id = params['id'];
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
            this.catalogoService.getProduct(this.id)
            .subscribe(
              (product) => {
                let data = product.payload.data();
                this.productForm.setValue(data);
                this.loading = false;
              }
            )
       });
   
      }
    )
  }

  addImage(event) {
    this.mensajeArchivo = `Archivo preparado ${event.target.files[0].name}`;
    this.archivo = event.target.files[0];
    this.nombreArchivo = event.target.files[0].name;

  }

  uploadImageAndData() {
    if (this.nombreArchivo) {
      let referencia = this.archivosService.referenciaArchivo(this.nombreArchivo);
      let tarea = this.archivosService.subirArchivo(this.nombreArchivo, this.archivo);
      this.finalizado = false;

    tarea.percentageChanges().subscribe(
      (porcentaje) => {
        this.porcentaje = Math.round(porcentaje);
        if (this.porcentaje === 100 ) {

        referencia.getDownloadURL().subscribe(
          (url) => {
            this.url = url;
            let data = {
              ...this.productForm.value,
              'imagen': this.url
            }
            this.catalogoService.updateProduct(this.id , data).then(
              (value) =>  this.router.navigate(['lista-productos'])
            )
            
          }
        )
        }
      }
    )
    } else {
      this.catalogoService.updateProduct(this.id , this.productForm.value).then(
        (value) =>  this.router.navigate(['lista-productos'])
      )
    }


  }

  ngOnInit() {
  }

}
