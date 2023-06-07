import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { Carousel } from './ellipse-carousel.interface';
import { Component, OnInit, ViewChild, ElementRef, Renderer2, Input } from '@angular/core';
import { Character } from 'src/app/akadimia';

@Component({
  selector: 'app-ellipse-carousel',
  templateUrl: './ellipse-carousel.component.html',
  styleUrls: ['./ellipse-carousel.component.scss'],
  animations: [
    trigger(
      'previousEnterAnimation', [
        transition(':enter', [
          style({filter: 'blur(100px)', opacity: 0}),
          animate('500ms', style({filter: 'blur(4px)', opacity: 1}))
        ]),
        transition(':leave', [
          style({filter: 'blur(100px)', opacity: 1}),
          animate('500ms', style({filter: 'blur(4px)', opacity: 0}))
        ])
      ]
    ), 
    trigger(
      'nextEnterAnimation', [
        transition(':enter', [
          style({filter: 'blur(100px)', opacity: 0, transform: 'translate(0px,-200px) scale(0.7)'}),
          animate('5ms', style({filter: 'blur(4px)', opacity: 1}))
        ]),
        transition(':leave', [
          style({filter: 'blur(100px)', opacity: 1}),
          animate('5ms', style({filter: 'blur(4px)', opacity: 0}))
        ])
      ]
    )
  ],
})
export class EllipseCarouselComponent implements OnInit {
  @ViewChild('carousel') carousel!: ElementRef;
  @Input() charactersList: Character[] = [];
  @Input() noDetails: boolean = false;
  @Input() noControls: boolean = false;
  @Input() biscuit: boolean = true;
  cellCount = 5;
  selectedIndex = 2;

 styles: (Carousel | undefined)[] = 
 [
  {
    transform:'translate(-150px,-300px) scale(0.5) ',
     filter:'blur(4px)'
   },
   {
    transform:'translate(-275px,-160px) scale(0.7)',
    filter:'blur(0px)'
   },
   {
   transform:'translate(0,-100px)',
   filter:'blur(0px)'
  }, 
  {
   transform:'translate(275px,-160px) scale(0.7)',
   filter:'blur(0px)'
  },
  {
   transform:'translate(150px,-300px) scale(0.5)',
    filter:'blur(4px)'

  },
  
 ]
;
  constructor(private renderer: Renderer2, private router:Router) { }

  ngOnInit(): void {
  }

  // 1 2 3 4

  // 4 1 2 3 -->
  // 2 3 4 1 <-- clockwise
  rotateCarousel(clockwise: boolean) {
    if (clockwise) {
      this.styles.unshift(this.styles.pop())
    } else {
      this.styles.push(this.styles.shift())
    } 

    let carousel_cells = this.carousel.nativeElement.children;
    for (let i = 0; i < 5; i++) {
      this.renderer.setStyle(carousel_cells[i], "transform", this.styles[i]!.transform)
      this.renderer.setStyle(carousel_cells[i], "filter", this.styles[i]!.filter)
    }
  }

  previous() {
    if (this.selectedIndex == 0) this.selectedIndex = 4;
    else this.selectedIndex = (this.selectedIndex - 1) % 5;
    this.rotateCarousel(false);
  }

  next() {
    this.selectedIndex = (this.selectedIndex + 1) % 5;
    this.rotateCarousel(true);
  }

  summon(character: Character) {
    this.router.navigate([`/character/${character.id}`]);
  }
}
