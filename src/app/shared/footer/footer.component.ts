import { Subscription } from 'rxjs/internal/Subscription';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { IOS_APP_DOWNLOAD_LINK } from './../../akadimia';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  downloadLink = IOS_APP_DOWNLOAD_LINK;
  
  constructor(private router: Router) { }

  ngOnInit(): void {

  }

}
