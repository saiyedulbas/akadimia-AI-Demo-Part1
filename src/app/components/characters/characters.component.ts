import { EllipseCarouselComponent } from './../../shared/ellipse-carousel/ellipse-carousel.component';
import { CharactersApiService } from './../../services/characters-api.service';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import * as _ from 'lodash';
import { Character } from 'src/app/akadimia';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { startWith, map, pluck, bufferToggle } from 'rxjs/operators';
import { trigger, transition, style, animate, keyframes, state } from '@angular/animations';
@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger("inOutAnimation", [
      state("in", style({ opacity: 1 })),
      transition(":enter", [
        animate(
          300,
          keyframes([
            style({ filter: 'blur(10px)', opacity: 0, offset: 0 }),
            style({ filter: 'blur(7px)', opacity: 0.25, offset: 0.25 }),
            style({ filter: 'blur(5px)', opacity: 0.5, offset: 0.5 }),
            style({ filter: 'blur(2px)', opacity: 0.75, offset: 0.75 }),
            style({ filter: 'none', opacity: 1, offset: 1 }),
          ])
        )
      ]),
      transition(":leave", [
        animate(
          300,
          keyframes([
            style({ filter: 'none', offset: 0 }),
            style({ filter: 'blur(2px)', offset: 0.25 }),
            style({ filter: 'blur(5px)', offset: 0.5 }),
            style({ filter: 'blur(7px)', offset: 0.75 }),
            style({ filter: 'blur(10px)', offset: 1 }),
          ])
        )
      ])
    ])
  ]
})
export class CharactersComponent implements OnInit {
  characterCtrl = new FormControl();
  filteredCharacters!: Observable<Character[]>;

  @ViewChild(EllipseCarouselComponent) carousel!: EllipseCarouselComponent

  allCharacters: Character[] = []
  currentCharacterIndex: number = 0
  currentCharacter: Character = this.allCharacters[this.currentCharacterIndex]
  gallerySlider: any[] = []
  carouselSlider: any[] =  []
  previousCarousel: any[] = this.carouselSlider

  allSubs$: Subscription[] = []

  trackById(index: number, item: Character) {
    return item.id
  }

  constructor(private charactersApi: CharactersApiService) { 
  }

  private _filterCharacters(value: string): Character[] {
    const filterValue = value.toLowerCase();
    
    return this.allCharacters.filter(c => c.name.toLowerCase().includes(filterValue));
  }
  
  ngOnInit(): void {
    this.allSubs$.push(this.charactersApi.getAllCharacters().subscribe(list => {
      this.allCharacters = list
      this.currentCharacterIndex = Math.floor(this.allCharacters.length/2)
      this.initSliders()
      this.filteredCharacters = this.characterCtrl.valueChanges.pipe(
        startWith(null),
        map(character => (character ? this._filterCharacters(character) : this.allCharacters.slice())),
      );
      // this.previousCarousel = this.carouselSlider
    }))
    
  }


  selectCharacter(id: any) {
    let index = this.allCharacters.findIndex(x => x.id == id)
    this.currentCharacterIndex = index;
    this.initSliders()
    this.characterCtrl.setValue(null)
  }

  galleryWindow: SliderWindow = {
    start: this.currentCharacterIndex - 4,
    end: this.currentCharacterIndex + 4,
    size: 9
  }

  carouselWindow: SliderWindow = {
    start: this.currentCharacterIndex - 2,
    end: this.currentCharacterIndex + 2,
    size: 5
  }

  updateGalleryWindowBounds() {
    this.galleryWindow = {
      start: this.preventOverflow(this.currentCharacterIndex - 4),
      end: this.preventOverflow(this.currentCharacterIndex + 4),
      size: 9
    }
  }

  updateCarouselWindowBounds() {
    this.carouselWindow = {
      start: this.preventOverflow(this.currentCharacterIndex - 2),
      end: this.preventOverflow(this.currentCharacterIndex + 2),
      size: 5
    }
  }

  getSliderWindow(slider: SliderWindow) {
    if (slider.start < 0) {
      return this.allCharacters.slice(slider.start).concat(this.allCharacters.slice(0, slider.end+1))
    } else if(slider.start > slider.end) {
      return this.allCharacters.slice(slider.start).concat(this.allCharacters.slice(0, slider.end+1))
    } else {
      let start = Math.max(slider.start, 0)
      let end = Math.min(slider.end+1, this.allCharacters.length)
      return this.allCharacters.slice(start, end)
    }
  }

  setGallerySlider() {
    this.gallerySlider = this.getSliderWindow(this.galleryWindow)
  }
  setCarouselSlider() {
    this.carouselSlider = this.getSliderWindow(this.carouselWindow)
    // console.log(this.carouselSlider)
  }

  initSliders() {
    this.currentCharacter = this.allCharacters[this.currentCharacterIndex]
    this.updateGalleryWindowBounds()
    this.updateCarouselWindowBounds()
    this.setCarouselSlider()
    this.setGallerySlider()
  }

  mod(x: number, y:number) {
    return ((x%y)+y)%y
  }

  preventOverflow(x:number) {
    return this.mod(x, this.allCharacters.length)
  }

  nextCharacter() {
    // update carousel
      // shift to the right 
      this.currentCharacterIndex = this.mod((this.currentCharacterIndex + 1),(this.allCharacters.length))
      this.currentCharacter = this.allCharacters[this.currentCharacterIndex]
      this.updateCarouselWindowBounds()
      this.setCarouselSlider()

    // update gallery slider
      this.updateGalleryWindowBounds()
      this.setGallerySlider()
      // this.currentCharacterIndex = (this.currentCharacterIndex + 1),(this.allCharacters.length-1)

    // update gallery
  }

  previousCharacter() {
    // update carousel slider
      this.currentCharacterIndex = this.mod((this.currentCharacterIndex - 1),(this.allCharacters.length))
      this.currentCharacter = this.allCharacters[this.currentCharacterIndex]
      this.updateCarouselWindowBounds()
      this.setCarouselSlider()

    // update gallery slider
      this.updateGalleryWindowBounds()
      this.setGallerySlider()
  }

  summon() {
    this.carousel.summon(this.currentCharacter)
  }



  ngOnDestroy(): void {
    this.allSubs$.forEach(sub => sub.unsubscribe())
  }
}

interface SliderWindow {
  start: number,
  end: number, 
  size: number
}