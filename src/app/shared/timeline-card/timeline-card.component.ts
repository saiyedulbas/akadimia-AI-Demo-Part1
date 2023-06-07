import { Router } from '@angular/router';
import { Component, Input, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Timeline } from 'src/app/akadimia';

@Component({
  selector: 'timeline-card',
  templateUrl: './timeline-card.component.html',
  styleUrls: ['./timeline-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TimelineCardComponent implements OnInit {
  @Input() isExpanded: boolean = false;
  @Input() timeline!: Timeline;
  @Output() onExpansionToggle = new EventEmitter<boolean>();
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toggleCard() {
    this.isExpanded = !this.isExpanded;
    this.onExpansionToggle.emit(this.isExpanded);
  }

  summonCharacter(id: any) {
    this.router.navigate([`character/${id}`])
  }
}
