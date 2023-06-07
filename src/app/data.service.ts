import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public isTrue = new BehaviorSubject<boolean>(true);
  public isFalse = new BehaviorSubject<boolean>(true);

  value$ = this.isTrue.asObservable();
  value2$ = this.isFalse.asObservable();

  setValue(value: boolean,value2:boolean): void {
    this.isTrue.next(value);
    this.isFalse.next(value2);
  }
}