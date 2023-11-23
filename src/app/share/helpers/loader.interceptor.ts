import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from 'src/app/services';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private requestCount = 0;
  constructor(private loader: LoaderService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.requestCount++;
    this.loader.setLoading(true);
    return next.handle(request).pipe(
      finalize(() => {
        this.requestCount--;
        if (this.requestCount == 0) this.loader.setLoading(false);
      })
    );
  }
}
