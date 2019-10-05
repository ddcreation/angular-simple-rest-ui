import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(
    private readonly _matSnack: MatSnackBar,
    private readonly _translate: TranslateService
  ) {}

  success(translateKey: string): void {
    this.open(translateKey, 'success');
  }

  error(translateKey: string): void {
    this.open(translateKey, 'warn');
  }

  open(translateKey: string, type: 'success' | 'warn') {
    this._translate.get(translateKey).subscribe(translation => this._matSnack.open(translation, null, {
      duration: 100000,
      panelClass: ['snackbar-' + type]
    }));
  }
}
