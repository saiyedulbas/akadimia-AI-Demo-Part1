import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';
import { UiService } from './services/ui.service';
import { IOS_APP_DOWNLOAD_LINK } from 'src/app/akadimia';
import { SidenavService } from './services/sidenav-service.service';
import { Component, HostListener, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  navbarFixed: boolean = false;
  downloadLink = IOS_APP_DOWNLOAD_LINK;
  isDarkTheme = true;
  sub!: Subscription;
  @HostListener('window:scroll', ['$event']) onScroll() {
    if (window.scrollY > 100 ) {
      this.navbarFixed = true
    } else {
      this.navbarFixed = false
    }
  }


  title = 'akadimia-ng-app';
  @ViewChild('sidenav') public sidenav!: MatSidenav;

  hideNavAndFooter$ = this.uiService.hideNavAndFooter$()

  constructor(private sidenavService: SidenavService, public uiService: UiService) {
    
  }

  ngOnInit() {
    this.sub = this.uiService.isDarkTheme$.subscribe(t => this.isDarkTheme = t );
    
  }

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }

  onDrawerOpen(isOpen: boolean) {
    this.sidenavService.setIsSidenavOpen(isOpen);
  }

  closeSidenav() {
    this.sidenavService.close();
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

}
