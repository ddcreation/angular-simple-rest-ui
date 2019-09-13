import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from './material.module';


@NgModule({
  declarations: [],
  exports: [
    TranslateModule,
    MaterialModule
  ]
})
export class SharedModule {}
