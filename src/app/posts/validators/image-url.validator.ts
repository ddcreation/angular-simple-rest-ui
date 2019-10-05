import { AbstractControl, ValidationErrors } from '@angular/forms';
import { AppSettings } from 'src/app/shared/app-settings';

export function ImageUrlValidator(
  control: AbstractControl
): Promise<ValidationErrors | null> {
  const error = { imageUrlInvalid: true };
  return new Promise(resolve => {
    // Empty : OK
    if (!control.value) {
      resolve(null);
    }

    // Invalid URL : KO
    if (!new RegExp(AppSettings.urlPattern).test(control.value)) {
      resolve(error);
    }

    // Test image load :
    const img = new Image();
    img.onload = () => {
      resolve(null);
    };

    img.onerror = () => {
      resolve(error);
    };

    img.src = control.value;
  });
}
