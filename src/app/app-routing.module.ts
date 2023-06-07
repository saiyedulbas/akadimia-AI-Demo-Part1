import { TeleportMobileComponent } from './components/teleport-mobile/teleport-mobile.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './core/auth.guard';
import { ViewBlogPostComponent } from './components/view-blog-post/view-blog-post.component';
import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { ThankYouComponent } from './components/thank-you/thank-you.component';
import { AddCharacterPageComponent } from './components/add-character-page/add-character-page.component';
import { CharacterComponent } from './components/character/character.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { PolicyComponent } from './components/policy/policy.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import { ErrorNotFoundComponent } from './components/error-not-found/error-not-found.component';
import { ContactComponent } from './components/contact/contact.component';
import { CharactersComponent } from './components/characters/characters.component';
import { BlogComponent } from './components/blog/blog.component';
import { TimeMachineComponent } from './components/time-machine/time-machine.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeleportComponent } from './components/teleport/teleport.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'timemachine', component: TimeMachineComponent},
  {path: 'blogs', component: BlogComponent},
  {path: 'characters', component: CharactersComponent},
  {path: 'contact', component: ContactComponent}, 
  {path: 'contact/:formType', component: ContactComponent}, 

  {path: '404', component: ErrorNotFoundComponent},
  {path: 'faqs', component: FaqsComponent},
  {path: 'how-it-works', component: HowItWorksComponent},
  {path: 'privacy-policy', component: PolicyComponent},
  {path: 'terms-and-conditions', component: TermsAndConditionsComponent},
  {path: 'pricing', component: PricingComponent},
  {path: 'teleport', component: TeleportComponent},
  {path: 'teleport-mobile', component: TeleportMobileComponent},
  {path: 'add-character', component: AddCharacterPageComponent, canActivate: [AuthGuard]},
  {path: 'character/:id', component: CharacterComponent},
  {path: 'blog/:id', component: ViewBlogPostComponent},
  {path: 'add-blog', component: AddBlogComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent}, 
  {path: 'signup', component: SignupComponent, canActivate: [AuthGuard]}, 

  { path: '**', pathMatch: 'full', component: ErrorNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
