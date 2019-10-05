import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { ImageUrlValidator } from '../validators/image-url.validator';
import { async, TestBed } from '@angular/core/testing';

describe('ImageUrlValidator', () => {
  const form = new FormGroup({
    image: new FormControl('')
  });

  const errorResponse = { imageUrlInvalid: true };
  const invalidUrls = ['aSimpleString', 'www.google.fr'];
  const invalidImages = ['http://www.google.fr'];
  const validImages = ['http://www.google.fr/favicon.ico', 'https://via.placeholder.com/150'];

  let imageField: AbstractControl;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule]
    }).compileComponents();

    imageField = form.get('image');
  }));
  it('should invalidate if url is invalid', async(() => {
    invalidUrls.map(url => {
      imageField.setValue(url);
      ImageUrlValidator(imageField).then(validation =>
        expect(validation).toEqual(errorResponse)
      );
    });
  }));

  it('should invalidate if url is valid but not an image', async(() => {
    invalidImages.map(url => {
      imageField.setValue(url);
      ImageUrlValidator(imageField).then(validation =>
        expect(validation).toEqual(errorResponse)
      );
    });
  }));

  it('should pass if empty', async(() => {
    imageField.setValue('');
    ImageUrlValidator(imageField).then(validation =>
      expect(validation).toBe(null)
    );
  }));

  it('should pass if it is an image', async(() => {
    validImages.map(url => {
      imageField.setValue(url);
      ImageUrlValidator(imageField).then(validation =>
        expect(validation).toBe(null)
      );
    });
  }));
});
