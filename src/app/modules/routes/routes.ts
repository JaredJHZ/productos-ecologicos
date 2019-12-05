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
import { EditarProductoComponent } from 'src/app/components/editar-producto/editar-producto.component';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { ContactoComponent } from 'src/app/components/contacto/contacto.component';
import { ProductoComponent } from 'src/app/components/producto/producto.component';
import { HtmlParser } from '@angular/compiler';

const appRoutes: Routes = [
    {
        path:'acerca',
        component: HomeComponent
        
    },
    {
        path:'home',
        component: CatalogoComponent
    },
    {
        path:'agregar-proveedor',
        component: AgregarProvedoresComponent ,
        canActivate:[AdminGuard]
    },
    {
        path:'lista-proveedores',
        component: ProveedoresListComponent,
        canActivate:[AdminGuard]
    },
    {
        path:'lista-productos',
        component: ProductsListComponent,
        canActivate:[AdminGuard]
    },
    {
        path:'editar-proveedor/:id',
        component:EditarProveedorComponent,
        canActivate:[AdminGuard]
    },
    {
        path:'agregar-producto',
        component: AgregarProductoComponent,
        canActivate:[AdminGuard]
    },
    {
        path:'editar-producto/:id',
        component:EditarProductoComponent,
        canActivate:[AdminGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path:'admin',
        component: AdminComponent,
        canActivate:[AdminGuard]
    },
    {
        path:'producto/:id',
        component:ProductoComponent
    },
    {
        path:'',
        redirectTo:'/home',
        pathMatch:'full'
    },
    {
        path:'**',
        redirectTo:'/home'

    }
]

export {appRoutes};