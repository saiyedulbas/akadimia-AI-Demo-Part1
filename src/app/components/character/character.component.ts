import { IOS_APP_DOWNLOAD_LINK } from './../../akadimia';
import { CharactersApiService } from './../../services/characters-api.service';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Character } from 'src/app/akadimia';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {
  characterId: any  = 'whoaa';
  character!: Character;
  allSubs$: Subscription[] = []
  downloadLink = IOS_APP_DOWNLOAD_LINK;
  constructor(private route:ActivatedRoute, private charactersApi: CharactersApiService, private router: Router) {

   }

  ngOnInit(): void {
    this.characterId = this.route.snapshot.paramMap.get('id');
    this.charactersApi.getCharacterById(this.characterId).subscribe(c => this.character = c)
  }

  seeAllCharacters() {
    this.router.navigate(["characters"])
  }

  ngOnDestroy() {
    this.allSubs$.forEach(sub => sub.unsubscribe())
  }
}
