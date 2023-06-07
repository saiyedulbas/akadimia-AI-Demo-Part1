import { Observable, switchMap } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import auth  from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router) {
      

    }

    get authenticated$(): Observable<any> {
      return this.afAuth.user
    }

    async signIn(email: string, password: string) {
      await this.afAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        // this.isLoggedIn = true;
        // localStorage.setItem('user', JSON.stringify(res.user))
      })
      // await this.afAuth.setPersistence(auth.auth.Auth.Persistence.SESSION).then(async () => {
      //   await this.afAuth.signInWithEmailAndPassword(email, password)
      //   .then(res => {
      //     // this.isLoggedIn = true;
      //     // localStorage.setItem('user', JSON.stringify(res.user))
      //   })
      // })
    }

    async signUp(email: string, password: string) {
      await this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        // this.isLoggedIn = true;
        // localStorage.setItem('user', JSON.stringify(res.user))
      })
    }

    logout() {
      this.afAuth.signOut()
      // localStorage.removeItem('user')
    }
}
