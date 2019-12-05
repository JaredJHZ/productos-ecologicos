import { Component, OnInit } from '@angular/core';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { ActivatedRoute } from '@angular/router';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { LoginService } from 'src/app/services/login.service';
import { trigger, state, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
  animations: [
    trigger('fade', [
      // ...
      state('start', style({
        opacity:'0'
      })),
      state('stop', style({
        opacity:'1'
      })),
      transition('start => stop', [
        animate('0.5s')
      ]),
      transition('stop => start', [
        animate('0.5s')
      ]),
    ])
  ]
})
export class ProductoComponent implements OnInit {

  producto:any;
  vendedor:any;
  comentarios: any[] = [];
  comentario:string = '';
  idProducto:any;
  sesionIniciada = false;
  i:number = 0;
  reaccion:string;
  icon:string = "home"
  iconText:string;
  loading = true;

  contentAnimation:string = 'start';

  siguienteImagen() {
    this.i += 1;
    if(this.i > this.producto.imagenes.length - 1) {
      this.i = 0;
    }
    this.startAnimation();
  }

  imagenAnterior() {
    this.i -= 1;
    if(this.i < 0) {
      this.i = this.producto.imagenes.length - 1;
    }
    this.startAnimation();
  }

  startAnimation() {
    this.contentAnimation = this.contentAnimation === 'start' ? 'stop' : 'start';
    setTimeout(() => {
      this.contentAnimation = this.contentAnimation === 'start' ? 'stop' : 'start';
    }, 500);
  }

  constructor(private catalogoService: CatalogoService, private activatedRoute:ActivatedRoute, private provedorService:ProveedorService, private loginService: LoginService) { 
    this.activatedRoute.params.subscribe(
      (params) => {
        let usuario = localStorage.getItem('user');
        if (!usuario) {
          this.sesionIniciada = false;
        } else {
          this.sesionIniciada = true;
          this.getReaction();
        }


        let id = params['id'];
        this.idProducto = id;
        this.loadComments();
        this.getReactionIcon();

        catalogoService.getProduct(id)
            .subscribe(
               (producto) => {
                 this.producto = producto.payload.data();
                 this.provedorService.getProvider(this.producto.vendedor).subscribe(
                   (vendedor) => {
                     this.vendedor = vendedor.payload.data();
                   }
                 )
               }
            )
      }
    )

    setTimeout(() => {
      this.contentAnimation = 'stop';
    }, 100);
  }

  loadComments() {
    this.loading = true;
    this.catalogoService.getComments()
    .subscribe(
      (comentarios) => {
        comentarios.forEach((comment: any) => {
          let data = comment.payload.doc.data()
          if (data.producto === this.idProducto) {
            this.comentarios.push(data);
            this.comentario='';
          }
        })
        this.loading = false;
      }
    )
  }

  hacerComentario() {
    let usuario:any = localStorage.getItem('user');
    usuario = JSON.parse(usuario);
    usuario = usuario.displayName;
    this.catalogoService.addComment(this.idProducto, this.comentario, usuario).then(
      (data)=> {
        this.comentarios = [];
        this.loadComments();
      }
    )
  }

  hacerReaccion(reaccion) {
    let usuario:any = localStorage.getItem('user');
    usuario = JSON.parse(usuario);
    usuario = usuario.uid;
    this.catalogoService.addReaction(this.idProducto, reaccion, usuario).then(
      (data) => {
        this.getReaction();
        this.getReactionIcon();
      }
    )
  }

  login () {
    this.loginService.login().then(
      (data) => {
        this.sesionIniciada = true;
        this.getReaction();
      }
    )
    
  }

  getReaction() {
    let usuario:any = localStorage.getItem('user');
    if (usuario) {
      usuario = JSON.parse(usuario);
      usuario = usuario.uid;
      this.catalogoService.getReaction(usuario).get().then(
        (data) => data.forEach(
          info => this.reaccion = info.data().reaccion
        )
      )
    }
  }

  getBackgroundColor(reaccion) {
    return this.reaccion === reaccion ? '#3b5284':'black';
  }

  getReactionIcon() {
    this.catalogoService.getPositiveReaction(this.idProducto)
        .then(
          (positivePerception) => {
            if (positivePerception > 90) {
              this.icon = 'emoji_events';
            } else if (positivePerception > 70) {
              this.icon = 'mood';
            } else if (positivePerception > 30) {
              this.icon = "sentiment_dissatisfied";
            } else {
              this.icon = "sentiment_very_dissatisfied"
            }
            this.setIconText();
          } 
        )
  }

  setIconText() {
    if (this.icon === 'emoji_events') {
      this.iconText = "Es de los productos destacados!"
    } else if (this.icon === 'mood') {
      this.iconText = "Es un buen producto!"
    } else if (this.icon === 'sentiment_dissatisfied') {
      this.iconText = "Este producto no es muy recomendable"
    } else {
      this.iconText = "No recomendamos que adquiera este producto!"
    }
  }

  ngOnInit() {
  }

}
