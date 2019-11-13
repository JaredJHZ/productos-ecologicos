import { Component, OnInit } from '@angular/core';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-agregar-provedores',
  templateUrl: './agregar-provedores.component.html',
  styleUrls: ['./agregar-provedores.component.css']
})
export class AgregarProvedoresComponent implements OnInit {

  public providerForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    ciudad: new FormControl('', Validators.required),
    estado: new FormControl('', Validators.required),
    calle: new FormControl('', Validators.required),
    numero: new FormControl('', Validators.required),
    colonia: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
  });

  constructor(private proveedorService:ProveedorService) { }

  ngOnInit() {
  }

  addProvider() {
    this.proveedorService.createProvider(this.providerForm.value).then(
      (data) => {
        console.log(data);
      }
    )
  }

}
