import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidarCamposService {

  constructor() { }

  hasErrorValidar(control: AbstractControl, erroName: string): boolean {
    if ((control.dirty || control.touched) && this.hasError(control, erroName)) {
      return true;
    }
    return false;
  }

  hasError(control: AbstractControl, erroName: string): boolean {
    return control.hasError(erroName);
  }
}
