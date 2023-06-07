import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ak-button',
  templateUrl: './ak-button.component.html',
  styleUrls: ['./ak-button.component.scss']
})
export class AkButtonComponent implements OnInit {
  @Input() text = 'button';
  @Input() prefixIcon:string | undefined;
  @Input() suffixIcon:string | undefined;
  @Input() buttonClasses!:string;
  @Input() disabled: boolean = false;
  @Input() action: any;
  
  constructor() { }

  ngOnInit(): void {
  }

  doAction() {
    if (this.action) this.action();
  }
}
