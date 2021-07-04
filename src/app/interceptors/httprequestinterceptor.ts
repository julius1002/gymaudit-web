import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';
import { AuthenticationService } from "../services/authentication.service";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    var jwt = localStorage.getItem("jwt")


    var clonedRequest = request

    if (jwt && !request.url.startsWith("https://www.googleapis.com/upload/drive/v3/files")) {
      clonedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${jwt}`
        }
      });
    }

    return next.handle(clonedRequest).pipe(tap(res => {
      if (res instanceof HttpResponse) {
        if (res.status < 300 && res.status >= 200) {
          this.authenticationService.setAuthentication(true)
        }
      }

    }, (err) => {
      if (err.status == 403 || err.status == 401) {
        this.authenticationService.setAuthentication(false); this.router.navigate(["/login"]); if (localStorage.getItem("jwt")) {
          localStorage.removeItem("jwt")
        }
      }
    }))
  }

}
