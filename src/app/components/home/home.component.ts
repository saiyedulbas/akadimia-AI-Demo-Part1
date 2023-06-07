import { EmailService } from './../../services/email.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IOS_APP_DOWNLOAD_LINK, MailChimpResponse } from './../../akadimia';
import { MockCharacters } from './mockCharacters';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AnimationType } from 'src/app/shared/carousel/carousel.animations';
import { CarouselComponent } from 'src/app/shared/carousel/carousel.component';
import { Slide } from 'src/app/shared/carousel/carousel.inteface';
import { Character } from 'src/app/akadimia';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';
import { DataService } from '../../data.service';
import { UiService } from 'src/app/services/ui.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  @ViewChild(CarouselComponent) carousel!: CarouselComponent;
  panelOpenState = false;
  animationType = AnimationType.Fade;
  currentSlide = 0;
  downloadLink = IOS_APP_DOWNLOAD_LINK;
  allSignups!: any;
  isTrue: any;
  isFalse: any;
  
  newsletterSignupForm: FormGroup<any> = new FormGroup({
    userEmail: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
  });


  animationTypes = [
    {
      name: "Scale",
      value: AnimationType.Scale
    },
    {
      name: "Fade",
      value: AnimationType.Fade
    },
    {
      name: "Flip",
      value: AnimationType.Flip
    },
    {
      name: "Jack In The Box",
      value: AnimationType.JackInTheBox
    }
  ];
  slides: Slide[] = [
    {
      timePeriod: "100 BC - 44 BC",
      designation: "Roman general",
      headline: "Julius Caesar",
      src:
        "../../../assets/julius-hero.png",
      // src:
      //   "https://images.unsplash.com/photo-1567653418876-5bb0e566e1c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
    },
    {
      timePeriod: "100 BC - 44 BC",
      designation: "Roman general",
      headline: "Plato",
      src:
        "https://images.unsplash.com/photo-1557800634-7bf3c7305596?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2001&q=80"
    },
    {
      timePeriod: "100 BC - 44 BC",
      designation: "Roman general",
      headline: "Einstein",
      src:
        "https://images.unsplash.com/photo-1551410224-699683e15636?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80"
    }
  ];

  mockCharacters: any[] = MockCharacters;

  getCharacters(n: number) {
    return this.mockCharacters.slice(0, n)
  }

  constructor(private emailService: EmailService, private _snackBar: MatSnackBar, public uiService: UiService) { }

  ngOnInit(): void {
    this.uiService.isDarkTheme$.subscribe(t => this.isTrue = t );
    this.uiService.isDarkTheme$.subscribe(t => this.isFalse = !t );
    this.emailService.getAllUserSignups().subscribe((x: any) => {
      this.allSignups = x
    });
  }

  onNextClick() {
    this.carousel.onNextClick();
  }

  onPreviousClick() {
    this.carousel.onPreviousClick();
  }
  onSlideChange(e: number) {
    this.currentSlide = e;
  }

  shuffle(array: any[]) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  newsletterSignup = () => {
    this.emailService.signUpToNewsletter(this.newsletterSignupForm.value.userEmail).subscribe((r:any) => {
      const res: MailChimpResponse = r.response
      if (res.error_count > 0) {
        switch (res.errors[0].error_code) {
          case "ERROR_CONTACT_EXISTS": {
            this._snackBar.open(`You have already signed up!`, 'Close', {
              duration: 2000,
              panelClass: ['success-snackbar']
            });
            break;
          }
          case "ERROR_GENERIC": {
            this._snackBar.open(`The email looks invalid, please enter a real email address.`, 'Close', {
              duration: 2000,
              panelClass: ['success-snackbar']
            });
            break;
          }
        }
      } else {
        this._snackBar.open(`Please check your email for the verification link!`, 'Close', {
          duration: 2000,
          panelClass: ['success-snackbar']
        });
      }

    })
    // let email = this.newsletterSignupForm.value.userEmail
    // let id = this.allSignups[0].id;
    // let emailList: Array<any> = this.allSignups[0].signups
    // if (emailList.find(x => x == email)) {
    //   this._snackBar.open(`You have already signed up!`, 'Close', {
    //     duration: 2000,
    //     panelClass: ['error-snackbar']
    //   });

    //   return
    // } else {
    //   // emailList.push(email)
    //   // this.emailService.updateUserSignups(id, emailList).subscribe(res => {
    //   //   this.emailService.sendSignUpEmail(email).pipe(take(1)).subscribe(x => {
    //   //     if (x.success == true) {
    //   //       this._snackBar.open(`Thank you for signing up`, 'Close', {
    //   //         duration: 2000,
    //   //         panelClass: ['success-snackbar']

    //   //       });
    //   //     } else {
    //   //       this._snackBar.open(`An error occured! :(`, 'Close', {
    //   //         duration: 2000,
    //   //         panelClass: ['error-snackbar']
    //   //       });
    //   //     }
    //   //   })
    //   // })
  }

}

