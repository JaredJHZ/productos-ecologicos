import {Routes} from '@angular/router';
import { HomeComponent } from 'src/app/components/home/home.component';
import { CatalogoComponent } from 'src/app/components/catalogo/catalogo.component';
import { AgregarProvedoresComponent } from 'src/app/components/agregar-provedores/agregar-provedores.component';

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
        path:'',
        redirectTo:'/home',
        pathMatch:'full'
    }
]

export {appRoutes};