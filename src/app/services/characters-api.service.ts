import { filter, last, of } from 'rxjs';
import { Character } from './../akadimia';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class CharactersApiService {
  constructor(private db: AngularFirestore, private storage: AngularFireStorage) {
  }

  getAllCharactersForMap() {

    return this.getAllCharacters().pipe(map(arr => arr.map((e: any) => {
      let x = e
      // TODO: Fix the terrible if logic -> Add dedicated lat, lon fields in the schema
      if (e.customFields && e.customFields[0] && e.customFields[0].fieldName && e.customFields[0].fieldName == 'lat') {
        let lat = parseFloat(e.customFields[0].fieldValue)
        let lon = parseFloat(e.customFields[1].fieldValue)
        x = { ...e, lat: lat, lon: lon }
      }
      // x = {...x, characterId: e.id}
      return x
      })),
      
    )
  }
  getAllCharacters(): Observable<any[]> {
    // const charactersRef = collection(this.firestore, 'characters')
    const ref = this.db.collection('characters')
    return ref.valueChanges({ idField: 'id' })
    // return collectionData(charactersRef, {idField: "id"}) as Observable<Character[]>
  }

  getCharacterById(id: string): Observable<Character> {
    const ref = this.db.doc(`characters/${id}`)
    return ref.valueChanges({ idField: 'id' }) as Observable<Character>
  }

  addCharacter(character: Character) {
    return this.db.collection('characters').add(character)
  }

  deleteCharacterById(id: string, imgUrl: string, vidUrl: any) {
    this.storage.refFromURL(imgUrl).delete()
    if (vidUrl) this.storage.refFromURL(vidUrl).delete()
    return this.db.doc(`characters/${id}`).delete()
  }
}
