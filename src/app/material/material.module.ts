import { NgModule } from '@angular/core';

import {
  MatToolbarModule,
  MatInputModule,
  MatMenuModule,
  MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    MatToolbarModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule
  ],
  exports: [
    MatToolbarModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule
  ]
})

export class MaterialModule {}
