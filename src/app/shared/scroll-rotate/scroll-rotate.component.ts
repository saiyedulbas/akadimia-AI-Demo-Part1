import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { EventEmitter } from '@angular/core';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { debounce, debounceTime, startWith } from 'rxjs';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-scroll-rotate',
  animations: [
    trigger('rotateAnimation', [  transition ('false => true', [
      animate ('4s ease-out',
      keyframes([
        style({ transform: 'rotate(-30deg)', opacity: 0}),
        style({ transform: 'rotate(0deg)', opacity: 1,  }),
      ])),
    ])])
  
  ],
  templateUrl: './scroll-rotate.component.html',
  styleUrls: ['./scroll-rotate.component.scss']
})
export class ScrollRotateComponent implements OnInit {
  animationStart = false;
  DEFAULT_ANGLE = -50;

  deg = this.DEFAULT_ANGLE;

  elementPos!: number;
  elementHeight!: number;
  scrollPos!: number;
  windowHeight!: number;
  appear = new EventEmitter<void>();

  ngOnInit(): void {
    this.subscribe();
  }

  subscriptionScroll!: Subscription;
  subscriptionResize!: Subscription;

  constructor(private element: ElementRef){
     this.appear = new EventEmitter<void>();
  }

  saveDimensions() {
    this.elementPos = this.getOffsetTop(this.element.nativeElement);
    this.elementHeight = this.element.nativeElement.offsetHeight;
    this.windowHeight = window.innerHeight;
  }
  saveScrollPos() {
    this.scrollPos = window.scrollY;
  }
  getOffsetTop(element: any){
    let offsetTop = element.offsetTop || 0;
    if(element.offsetParent){
      offsetTop += this.getOffsetTop(element.offsetParent);
    }
    return offsetTop;
  }
  checkVisibility(){
    if(this.isVisible()){
      // double check dimensions (due to async loaded contents, e.g. images)
      this.saveDimensions();
      if(this.isVisible()){
        this.unsubscribe();
        this.animationStart = true;
        //alert('VISIBLE')
      } else {}
    }
  }

  isVisible(){
     return (this.scrollPos + this.windowHeight + 200) >= this.elementPos 
     //|| (this.scrollPos + 2*this.windowHeight) >= (this.elementPos + this.elementHeight);
    //return (this.scrollPos + this.windowHeight)
  }

  subscribe(){
    this.subscriptionScroll = fromEvent(window, 'scroll').pipe(startWith(null))
      .subscribe(() => {
        this.saveScrollPos();
        this.checkVisibility();
      });
    this.subscriptionResize = fromEvent(window, 'resize').pipe(startWith(null))
      .subscribe(() => {
        this.saveDimensions();
        this.checkVisibility();
      });
  }
  unsubscribe(){
    if(this.subscriptionScroll){
      this.subscriptionScroll.unsubscribe();
    }
    if(this.subscriptionResize){
      this.subscriptionResize.unsubscribe();
    }
  }

  ngAfterViewInit(){
    
  }
  ngOnDestroy(){
    this.unsubscribe();
  }
}
