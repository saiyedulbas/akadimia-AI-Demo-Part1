import { UiService } from './../../services/ui.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Component, HostListener, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { SidenavService } from 'src/app/services/sidenav-service.service';
import { IOS_APP_DOWNLOAD_LINK } from 'src/app/akadimia';
import { DataService } from '../../data.service'


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss',],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {
  @Input() navbarFixed:boolean = false;
  downloadLink = IOS_APP_DOWNLOAD_LINK;
  isSidenavOpenSubscription$!: Subscription;

  get sidenavopen$() {
    return this.sidenav.isSidenavOpen$
  }

  constructor(  
    private sidenav: SidenavService, public uiService: UiService) { }

  toggleRightSidenav() {
    this.sidenav.toggle();
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy() {
    if (this.isSidenavOpenSubscription$) this.isSidenavOpenSubscription$.unsubscribe();
  }

  enableDarkMode() {
    this.uiService.enableDarkMode();
  }

  enableLightMode() {
    this.uiService.enableLightMode();
      
  }

}



