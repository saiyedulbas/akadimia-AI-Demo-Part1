import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ContactForm, QuoteForm } from './../akadimia';
import { from, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient, private afsFunctions: AngularFireFunctions, private db: AngularFirestore) { }

  signUpToNewsletter(email: string): Observable<any> {
    // const callable = this.afsFunctions.httpsCallable('mcSignup')

    const obj = [
      {
        email_address: email,
        status: "pending",
      }
    ]


    // return callable({ body: obj });

      const url = 'https://us-central1-akadimia-angular.cloudfunctions.net/secureEndpoint';
      return this.http.post(url, obj)
  }

  sendContactUsEmail(subject: string, body: ContactForm): Observable<any> {
    const callable = this.afsFunctions.httpsCallable('sendContactUsEmail')
    return callable({ subject: subject, body: body });
  }

  sendQuoteEmail(subject: string, body: QuoteForm) {
    const callable = this.afsFunctions.httpsCallable('sendQuoteEmail')
    return callable({ subject: subject, body: body });
  }

  sendSignUpEmail(email: string) {
    const callable = this.afsFunctions.httpsCallable('sendSignupEmail')
    return callable({ email: email });
  }

  getAllUserSignups(): Observable<any[]> {
    // const charactersRef = collection(this.firestore, 'characters')
    const ref = this.db.collection('newsletter-signups')
    return ref.valueChanges({ idField: 'id' })
    // return collectionData(charactersRef, {idField: "id"}) as Observable<Character[]>
  }

  updateUserSignups(id: string, signupList: string[]) {
    return from(this.db.doc(`newsletter-signups/${id}`).update({ signups: signupList }))
  }
  // uploadBlogImage(imageFolderName: string, image: any) {
  //   const callable = this.afsFunctions.httpsCallable('uploadImage')
  //   return callable({ imageFolderName: imageFolderName, image: image })
  // }
}
