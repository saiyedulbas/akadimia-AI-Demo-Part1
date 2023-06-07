import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TimeMachineComponent } from './components/time-machine/time-machine.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import { ContactComponent } from './components/contact/contact.component';
import { TeleportComponent } from './components/teleport/teleport.component';
import { ErrorNotFoundComponent } from './components/error-not-found/error-not-found.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { CharactersComponent } from './components/characters/characters.component';
import { PolicyComponent } from './components/policy/policy.component';
import { BlogComponent } from './components/blog/blog.component';
import { SharedModule } from './shared/shared.module';

// import {MatIconModule} from '@angular/material/icon';
// import {MatButtonModule} from '@angular/material/button';

// import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
// import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
// import { provideAuth,getAuth } from '@angular/fire/auth';
// import { provideDatabase,getDatabase } from '@angular/fire/database';
// import { provideFirestore,getFirestore } from '@angular/fire/firestore';
// import { provideFunctions,getFunctions } from '@angular/fire/functions';
// import { provideMessaging,getMessaging } from '@angular/fire/messaging';
// import { providePerformance,getPerformance } from '@angular/fire/performance';
// import { provideRemoteConfig,getRemoteConfig } from '@angular/fire/remote-config';
// import { provideStorage,getStorage } from '@angular/fire/storage';

import { AngularFireModule } from '@angular/fire/compat/'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'
import { CharacterComponent } from './components/character/character.component';
import { AddCharacterPageComponent } from './components/add-character-page/add-character-page.component';
import { AngularFireStorageModule, BUCKET  } from '@angular/fire/compat/storage';
import { ThankYouComponent } from './components/thank-you/thank-you.component';
import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { BlogPreviewComponent } from './components/blog-preview/blog-preview.component';
import { ViewBlogPostComponent } from './components/view-blog-post/view-blog-post.component';
import { AuthGuard } from './core/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { PERSISTENCE } from '@angular/fire/compat/auth';

import { HighchartsChartModule } from 'highcharts-angular';
import { TeleportMobileComponent } from './components/teleport-mobile/teleport-mobile.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TimeMachineComponent,
    FaqsComponent,
    ContactComponent,
    TeleportComponent,
    ErrorNotFoundComponent,
    PricingComponent,
    HowItWorksComponent,
    CharactersComponent,
    PolicyComponent,
    BlogComponent,
    CharacterComponent,
    AddCharacterPageComponent,
    ThankYouComponent,
    AddBlogComponent,
    BlogPreviewComponent,
    ViewBlogPostComponent,
    LoginComponent,
    SignupComponent,
    TermsAndConditionsComponent,
    TeleportMobileComponent
  
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireStorageModule,
    HighchartsChartModule,
    HttpClientModule
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideAnalytics(() => getAnalytics()),
    // provideAuth(() => getAuth()),
    // provideDatabase(() => getDatabase()),
    // provideFirestore(() => getFirestore()),
    // provideFunctions(() => getFunctions()),
    // provideMessaging(() => getMessaging()),
    // providePerformance(() => getPerformance()),
    // provideRemoteConfig(() => getRemoteConfig()),
    // provideStorage(() => getStorage()),
  ],
  providers: [
    // ScreenTrackingService,
    // UserTrackingService,
    { provide: BUCKET, useValue: environment.firebase.storageBucket, },
    { provide: PERSISTENCE, useValue: 'session' },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
