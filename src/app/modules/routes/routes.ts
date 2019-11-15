import {Routes} from '@angular/router';
import { HomeComponent } from 'src/app/components/home/home.component';
import { CatalogoComponent } from 'src/app/components/catalogo/catalogo.component';
import { AgregarProvedoresComponent } from 'src/app/components/agregar-provedores/agregar-provedores.component';
import { ProveedoresListComponent } from 'src/app/components/proveedores-list/proveedores-list.component';
import { AgregarProductoComponent } from 'src/app/components/agregar-producto/agregar-producto.component';

const appRoutes: Routes = [
    {
        path:'home',
        component: HomeComponent
    },
    {
        path:'catalogo',
        component: CatalogoComponent
    },
    {
        path:'agregar-proveedor',
        component: AgregarProvedoresComponent 
    },
    {
        path:'lista-proveedores',
        component: ProveedoresListComponent
    },
    {
        path:'agregar-producto',
        component: AgregarProductoComponent
    },
    {
        path:'',
        redirectTo:'/home',
        pathMatch:'full'
    }
]

export {appRoutes};