import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function customTaskTitleValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return { 'required': true }; 
    }

    if (control.value.length < 3 || control.value.length > 255) {
      return { 'size': true }; 
    }

    return null; 
  };
}
