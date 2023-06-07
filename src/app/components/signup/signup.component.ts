import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  email!: string;
  password!: string;

  constructor(private auth:AuthService, private snackBar: SnackbarService) { }

  ngOnInit(): void {
  }

  signup = () => {
    this.auth.signUp(this.email, this.password).then(res => {
      // console.log('Created user!')
      this.snackBar.showSnackbar('Created user!', 'close')
    }).catch(err => {
      this.snackBar.showSnackbar('Error creating user', 'close')
    })
  }
}
