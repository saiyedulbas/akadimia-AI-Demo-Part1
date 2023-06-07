import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar) { }

  showSnackbar(msg: string, action: string) {
    this._snackBar.open(msg, action, {
      duration: 2000,
      panelClass: ['success-snackbar']
    });
  }
}
