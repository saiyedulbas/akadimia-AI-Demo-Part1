import { Subscription } from 'rxjs/internal/Subscription';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email!: string;
  password!: string;

  isLoggedIn: boolean = false
  sub$!: Subscription;

  constructor(private auth:AuthService, private snackBar: SnackbarService) { }

  ngOnInit(): void {
   this.sub$ =  this.auth.authenticated$.subscribe(user => {
      if (user !== null) this.isLoggedIn = true;
    })
  }

  login = () => {
    this.auth.signIn(this.email, this.password).then(res => {
      // console.log('Logged in!')
      this.snackBar.showSnackbar('Logged in', 'close')
    }).catch(err => {
      this.snackBar.showSnackbar('Invalid email/password', 'close')
    })
  }

  ngOnDestroy() {
    if (this.sub$) this.sub$.unsubscribe()
  }
}
