import { Component, OnInit, HostListener} from '@angular/core';
import {trigger, style, state, animate, transition} from '@angular/animations';
import { ScrollDispatchModule, ScrollDispatcher } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-acerca',
  templateUrl: './acerca.component.html',
  styleUrls: ['./acerca.component.css'],
  animations: [
    trigger('slide', [
      state('hidden', style({
        left: '-100px'
      })) ,
      state('active', style({
        left: '30%'
      })),
      transition('hidden => active' , animate('1800ms ease-in')),
      transition('active => hidden' , animate('1800ms ease-out'))
    ])
  ]
})
export class AcercaComponent implements OnInit {
  
  
  public state:string = 'hidden';

  constructor(private scrollDispatcher: ScrollDispatcher) {

  }

  ngOnInit() {
    this.scrollDispatcher.scrolled().subscribe(
      (data) => {
        const scrollTop = data.getElementRef().nativeElement.scrollTop;
        if (scrollTop === 40) {
          this.startAnimation();
        }
      }
    )
  }

  startAnimation () {
    if (this.state !== 'active'){
      this.state = 'active';
    }
  }



}
