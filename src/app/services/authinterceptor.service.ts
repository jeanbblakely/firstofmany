import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  intercept(req, next) {
    var authRequest = req.clone({
      headers: req.headers.set('Authorization', 'token' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1ZDFhYmI4ZjYxM2E5YjBkZjRiYjVjZmYifQ.MeOtHOb_mgJ9xLKBy5u4BJWZWhM5-doAGpzOpO2qH2o')
    });
    return next.handle(authRequest);
  }
}
