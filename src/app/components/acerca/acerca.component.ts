import { Component, OnInit, HostListener} from '@angular/core';
import {trigger, style, state, animate, transition} from '@angular/animations';
import { ScrollDispatchModule, ScrollDispatcher } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-acerca',
  templateUrl: './acerca.component.html',
  styleUrls: ['./acerca.component.css']
})
export class AcercaComponent implements OnInit {
  
  
  public info:boolean = false;

  constructor(private scrollDispatcher: ScrollDispatcher) {

  }

  ngOnInit() {

    this.scrollDispatcher.scrolled().subscribe(
      (data:any) => {
        const scrollTop = data.getElementRef().nativeElement.scrollTop;
       
      }
    )
  }



}
