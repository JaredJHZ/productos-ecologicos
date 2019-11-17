import {Routes} from '@angular/router';
import { HomeComponent } from 'src/app/components/home/home.component';
import { CatalogoComponent } from 'src/app/components/catalogo/catalogo.component';
import { AgregarProvedoresComponent } from 'src/app/components/agregar-provedores/agregar-provedores.component';
import { ProveedoresListComponent } from 'src/app/components/proveedores-list/proveedores-list.component';
import { AgregarProductoComponent } from 'src/app/components/agregar-producto/agregar-producto.component';
import { AcercaComponent } from 'src/app/components/acerca/acerca.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { AdminComponent } from 'src/app/components/admin/admin.component';
import { ProductsListComponent } from 'src/app/components/products-list/products-list.component';
import { EditarProveedorComponent } from 'src/app/components/editar-proveedor/editar-proveedor.component';

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
        path:'lista-productos',
        component: ProductsListComponent
    },
    {
        path:'editar-proveedor/:id',
        component:EditarProveedorComponent
    },
    {
        path:'agregar-producto',
        component: AgregarProductoComponent
    },
    {
        path:'acerca',
        component: AcercaComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path:'admin',
        component: AdminComponent
    },
    {
        path:'',
        redirectTo:'/home',
        pathMatch:'full'
    }
]

export {appRoutes};