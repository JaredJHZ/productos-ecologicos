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
    TrackScrollDirective
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
  entryComponents: [ContactInfoComponent]
})
export class AppModule { }
