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
  archivos: any[] = [];
  mensajeArchivo:string;
  nombreArchivos:string[] = [];
  porcentaje = 0;
  finalizado: boolean = true;
  url:string;
  id: string;
  producto:any;
  arrayDeReferencias: any[] = [];
  imagenPrincipal: any;
  nombreImagenPrincipal: any;

  loading:boolean = true;

  public productForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    costo: new FormControl('', Validators.required),
    vendedor: new FormControl('', Validators.required),
    membresia: new FormControl('', Validators.required),
    imagenPrincipal: new FormControl(''),
    categoria: new FormControl('', Validators.required),
    imagenes: new FormControl('')
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

                this.producto = {
                  ...data,
                  id:product.payload.id
                };

                if(!this.producto.imagenes) {
                  this.productForm.removeControl("imagenes");
                }

                this.productForm.setValue(data);
              
                this.loading = false;
              }
            )
       });
   
      }
    )
  }

  addImage(event) {
    this.archivos.push(event.target.files[0]);
    this.nombreArchivos.push(event.target.files[0].name); 
   
  }

  addP(event) {
    this.imagenPrincipal = event.target.files[0];
    this.nombreImagenPrincipal = event.target.files[0].name;
  }

  async uploadImagesAndData() {

    this.loading = true;



    if (this.nombreArchivos.length < 1 && !this.nombreImagenPrincipal) {
        this.catalogoService.updateProduct(this.id , {
          ...this.productForm.value
        }).then(
          (ok) => this.loading = false)
    } else {
        if (this.nombreArchivos.length < 1 && this.nombreImagenPrincipal) {
          let url = await this.archivosService.subirArchivoPrincipal(this.nombreImagenPrincipal, this.imagenPrincipal, this.id);
          console.log(url);
          this.productForm.controls['imagenPrincipal'].setValue(url);
          this.catalogoService.updateProduct(this.id , {
            ...this.productForm.value
          })
          .then(
            () => this.loading = false
          )
        } else {

          for(let i = 0 ; i < this.nombreArchivos.length ; i++) {
            let url = await this.archivosService.subirArchivoSecundario(this.nombreArchivos[i], this.archivos[i], this.id);
            this.arrayDeReferencias.push(url);
          }

          if (this.nombreImagenPrincipal) {
            let urlPrincipal = await this.archivosService.subirArchivoPrincipal(this.nombreImagenPrincipal, this.imagenPrincipal, this.id);
            this.productForm.controls['imagenPrincipal'].setValue(urlPrincipal);
          }

          this.catalogoService.updateProduct(this.id , {
            ...this.productForm.value,
            imagenes: this.arrayDeReferencias
          })
          .then(
            () => this.loading = false
          )

        }
    }  
  }

  ngOnInit() {
  }

  cancelar() {
    this.router.navigate(['lista-proveedores']);
  }

}
