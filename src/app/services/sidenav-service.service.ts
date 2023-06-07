import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
    providedIn: 'root'
})
export class SidenavService {
    private sidenav!: MatSidenav;
    private isSidenavOpenSource$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    
    isSidenavOpen$: Observable<boolean> = this.isSidenavOpenSource$.asObservable();
    


    public setSidenav(sidenav: MatSidenav) {
        this.sidenav = sidenav;
    }

    public open() {
        return this.sidenav.open();
    }

    public close() {
        return this.sidenav.close();
    }

    public toggle(): void {
        this.sidenav.toggle();
    }

    public setIsSidenavOpen(isOpen: boolean) {
        this.isSidenavOpenSource$.next(isOpen);
    }
}