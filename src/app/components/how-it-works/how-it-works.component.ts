import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss']
})
export class HowItWorksComponent implements OnInit {
  videoURL = "https://www.youtube.com/embed/2qLuerYx2IA";
  safeURL: SafeResourceUrl;
  constructor(private _sanitizer: DomSanitizer){
    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(this.videoURL);
 }
  ngOnInit(): void {
  }

}
