import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import { AuthenticationService } from "../services/authentication.service";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    var jwt = localStorage.getItem("jwt")

    var newRequest = request
    if (jwt) {
      newRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${jwt}`
        }
      });
    }

    return next.handle(newRequest).pipe(tap(res => {
      if (res instanceof HttpResponse) {
        if (res.status < 300 && res.status >= 200) {
          this.authenticationService.setAuthenticated(true)
        }
      }

    }, (err) => {this.authenticationService.setAuthenticated(false); this.router.navigate(["/login"])}))
  }

}
