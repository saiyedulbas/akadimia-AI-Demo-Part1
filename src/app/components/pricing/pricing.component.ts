import { IOS_APP_DOWNLOAD_LINK } from './../../akadimia';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {
  downloadLink = IOS_APP_DOWNLOAD_LINK;
  
  constructor() { }

  ngOnInit(): void {
  }

}
