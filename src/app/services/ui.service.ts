import { BehaviorSubject, filter, map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UiService {
  private isDarkThemeSource$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  isDarkTheme$: Observable<boolean> = this.isDarkThemeSource$.asObservable();


  constructor(private router: Router) { }

  enableDarkMode() {
    this.isDarkThemeSource$.next(true);
  }

  enableLightMode() {
    this.isDarkThemeSource$.next(false);
  }

  getImgUrl(name: string) {
    switch (name) {
      case 'contact-us':
        return this.isDarkThemeSource$.value == true ? "../../../assets/contact-us-dark.svg" : "../../../assets/contact-us.svg"
      case 'sun':
        return this.isDarkThemeSource$.value == true ? "../../../assets/icons/sun-dark.svg" : "../../../assets/icons/sun.svg"
      case 'moon':
        return this.isDarkThemeSource$.value == true ? "../../../assets/icons/moon-dark.svg" : "../../../assets/icons/moon.svg"
      default:
        console.error('src not found')
        return ''
    }
  }

  hideNavAndFooter$(): Observable<boolean> {
    return this.router.events.pipe(
      filter(x => x instanceof NavigationEnd),
      map((val: any) => val.url == '/teleport-mobile'))
  }

}
