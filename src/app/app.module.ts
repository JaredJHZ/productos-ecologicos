import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { LayoutComponent } from './components/layout/layout.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { HomeComponent } from './components/home/home.component';
import { RoutesModule } from './modules/routes/routes.module';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { MenuComponent } from './components/menu/menu.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { AgregarProvedoresComponent } from './components/agregar-provedores/agregar-provedores.component';
import { ProveedoresListComponent } from './components/proveedores-list/proveedores-list.component';
import { AgregarProductoComponent } from './components/agregar-producto/agregar-producto.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ShortNamePipe } from './pipes/short-name.pipe';
import { IconImagePipe } from './pipes/icon-image.pipe';
import { ContactInfoComponent } from './components/contact-info/contact-info.component';
import { AcercaComponent } from './components/acerca/acerca.component';
import {NgsRevealModule} from 'ngx-scrollreveal';
import { TrackScrollDirective } from './scroll-directive';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { AnimateComponent } from './animate/animate.components';
import { LoginComponent } from './components/login/login.component';
import { LoadingComponent } from './components/loading/loading.component';
import { SelectionPopupComponent } from './components/selection-popup/selection-popup.component';
import { AdminComponent } from './components/admin/admin.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { InfoProductComponent } from './components/info-product/info-product.component';
import { EditarProveedorComponent } from './components/editar-proveedor/editar-proveedor.component';
import { EditarProductoComponent } from './components/editar-producto/editar-producto.component';
import { ContactoComponent } from './components/contacto/contacto.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    ToolbarComponent,
    HomeComponent,
    MenuComponent,
    CatalogoComponent,
    BuscadorComponent,
    AgregarProvedoresComponent,
    ProveedoresListComponent,
    AgregarProductoComponent,
    ShortNamePipe,
    IconImagePipe,
    ContactInfoComponent,
    AcercaComponent,
    TrackScrollDirective,
    AnimateComponent,
    LoginComponent,
    LoadingComponent,
    SelectionPopupComponent,
    AdminComponent,
    ProductsListComponent,
    InfoProductComponent,
    EditarProveedorComponent,
    EditarProductoComponent,
    ContactoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RoutesModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    NgsRevealModule,
    ScrollDispatchModule

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ContactInfoComponent, SelectionPopupComponent, InfoProductComponent]
})
export class AppModule { }
