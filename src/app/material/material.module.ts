import { NgModule } from '@angular/core';

import {
  MatToolbarModule,
  MatInputModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatSelectModule,
  MatCardModule,
  MatDatepickerModule,
  MatNativeDateModule
 } from '@angular/material';

@NgModule({
  imports: [
    MatToolbarModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatSelectModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [
    MatToolbarModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatSelectModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})

export class MaterialModule {}
