import { AbstractControl, ValidatorFn } from '@angular/forms';

export function companyWebPageValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      const urlPattern = /^https:\/\/www\./;
  
      if (!value) {
        return { required: true }; // Set required error if value is empty
      }
  
      if (!urlPattern.test(value)) {
        return { invalidPrefix: true };
      }
  
      // Check if there is anything after "https://www."
      const suffix = value.replace(urlPattern, '');
      if (!suffix.trim()) {
        return { requiredAfterPrefix: true };
      }
  
      return null;
    };
  }