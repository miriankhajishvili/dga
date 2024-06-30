import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class FilmsInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedRequest = req.clone({
      setHeaders: {
        'X-RapidAPI-Key': 'a1df506eafmsh2773ed43afcea78p1043d7jsnf07e88efdb92',
      }
    });

    return next.handle(clonedRequest);
  }

}
