import { Subscription } from 'rxjs/internal/Subscription';
import { CharactersApiService } from './../../services/characters-api.service';
import { mockTimeline, mockTimelineDark } from './mock-data-timeline';
import { Character, Timeline } from './../../akadimia';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-machine',
  templateUrl: './time-machine.component.html',
  styleUrls: ['./time-machine.component.scss']
})
export class TimeMachineComponent implements OnInit {
  timelines: Timeline[] = mockTimeline;
  darkTimelines: Timeline[] = mockTimelineDark;
  isBC: boolean = false;
  
  sub$!: Subscription;
  allCharacters: Character[] = []
  constructor(private charactersApi: CharactersApiService) { }

  ngOnInit(): void {
    // Get all characters
    this.sub$ = this.charactersApi.getAllCharacters().subscribe(c => {
      this.allCharacters = c
      // Assign characters to their era
      this.timelines.forEach(t => {
        t.characters = this.getCharactersByEra(t.period)
      })

      this.darkTimelines.forEach(t => {
        t.characters = this.getCharactersByEra(t.period)
      })
    })
  }

  getCharactersByEra(era: string) {
    return this.allCharacters.filter( x => x.period == era)
  }

  ngOnDestroy() {
    if (this.sub$) this.sub$.unsubscribe();
  }

}
