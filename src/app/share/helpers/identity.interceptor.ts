import { AuthService } from 'src/app/services';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, switchMap, tap, throwError } from 'rxjs';

@Injectable()
export class IdentityInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  constructor(private authService: AuthService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const identity = this.authService.getIdentity();
    const skipIntercept = request.headers.has('skip');

    if (skipIntercept) {
      request = request.clone({
        headers: request.headers.delete('skip'),
      });
    } else if (identity !== null) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${identity.accessToken}`,
          'x-user-id': `${identity.userId}`,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          !request.url.includes('/login') &&
          error.status === 401
        ) {
          return this.handle401Error(request, next);
        }
        console.clear();
        return throwError(() => error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      if (this.authService.IsLogged()) {
        return this.authService.refreshToken().pipe(
          tap((response) => {
            this.isRefreshing = false;
            this.authService.saveIdentity(response.data);
          }),
          switchMap((response) => {
            request = request.clone({
              setHeaders: {
                Authorization: `Bearer ${response.data.accessToken}`,
                'x-user-id': `${response.data.userId}`,
              },
            });
            return next.handle(request);
          }),
          catchError((error) => {
            this.isRefreshing = false;
            return throwError(() => error);
          })
        );
      }
    }

    return next.handle(request);
  }
}
