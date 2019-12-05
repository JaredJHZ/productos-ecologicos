import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedorService } from 'src/app/services/proveedor.service';

@Component({
  selector: 'app-editar-proveedor',
  templateUrl: './editar-proveedor.component.html',
  styleUrls: ['./editar-proveedor.component.css']
})
export class EditarProveedorComponent implements OnInit {

  provider: any;
  loading: boolean = true;
  public providerForm;

  constructor(private activatedRoute: ActivatedRoute, private providerService: ProveedorService,
    private router:Router) {
    this.activatedRoute.params.subscribe(
      (params) => {
        let id = params['id'];
        this.providerService.getProvider(id)
        .subscribe(
          (provider) => {
            this.provider = provider.payload.data();
            this.provider['id'] = id;
            this.loading = false;
            let pagina = this.provider.pagina;
            console.log(pagina);
            this.providerForm = new FormGroup({
              nombre: new FormControl(this.provider.nombre, Validators.required),
              telefono: new FormControl(this.provider.telefono, Validators.required),
              ciudad: new FormControl(this.provider.ciudad, Validators.required),
              estado: new FormControl(this.provider.estado, Validators.required),
              calle: new FormControl(this.provider.calle, Validators.required),
              numero: new FormControl(this.provider.numero, Validators.required),
              colonia: new FormControl(this.provider.colonia, Validators.required),
              email: new FormControl(this.provider.email, Validators.required),
              pagina: new FormControl(pagina)
            });
        
          }
        )
      }
    )
  }

  ngOnInit() {
  }

  actualizar(){
    this.providerService.updateProvider(this.provider.id, this.providerForm.value)
        .then(
          () => this.router.navigate(['lista-proveedores'])
        )
  }

  cancelar() {
    this.router.navigate(['lista-proveedores']);
  }

  

}
