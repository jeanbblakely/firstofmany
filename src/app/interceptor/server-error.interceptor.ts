import { Injectable } from '@angular/core';
<<<<<<< HEAD
import {
=======
import { MatSnackBar } from '@angular/material';

import {
>>>>>>> f0aa8cfc63c8d2fa34319c43fa08b0901763e230
  HttpEvent, HttpRequest, HttpHandler,
  HttpInterceptor, HttpErrorResponse
  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable()

export class ServerErrorInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        console.log('Error Intercepted');
        console.log(error.error.message, 'error');
        this.snackBar.open(error.error.message, 'Okay');
        return throwError(error);
      })
    );
  }
}
