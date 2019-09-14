import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule, MatDividerModule, MatSnackBarModule } from '@angular/material';

const MODULES = [
  MatCardModule,
  MatToolbarModule,
  MatButtonToggleModule,
  MatTableModule,
  MatFormFieldModule,
  MatIconModule,
  MatButtonModule,
  MatMenuModule,
  MatInputModule,
  MatDividerModule,
  MatSnackBarModule
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...MODULES],
  exports: MODULES
})
export class MaterialModule {}
