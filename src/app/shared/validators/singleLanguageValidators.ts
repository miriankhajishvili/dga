import { AbstractControl, ValidatorFn } from '@angular/forms';

export function singleLanguageValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const inputValue = control.value;
    if (!inputValue) return null;

    const containsEnglish = /[a-zA-Z]/.test(inputValue);
    const containsGeorgian = /[\u10D0-\u10FF]/.test(inputValue);

    if (containsEnglish && containsGeorgian) {
      return { singleLanguage: true };
    }

    return null;
  };
}
