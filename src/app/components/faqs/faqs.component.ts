import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { questions } from './questionsList';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Question } from 'src/app/akadimia';
import { NONE_TYPE } from '@angular/compiler';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FaqsComponent implements OnInit {
  questions: Question[] = questions;
  filteredQuestions!: Observable<Question[]>;
  filterCtrl = new FormControl();
  constructor() { }

  ngOnInit(): void {
    this.filteredQuestions = this.filterCtrl.valueChanges.pipe(
      startWith(null),
      map(question => (question ? this._filterQuestions(question) : this.questions.slice())),
    );
  }

  private _filterQuestions(value: string): Question[] {
    const filterValue = value.toLowerCase();
    
    return this.questions.filter(c => c.q.toLowerCase().includes(filterValue));
  }


}
