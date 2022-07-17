import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthLoginInfo} from "./models/login-info";
import {JwtResponse} from "./jwt-response";
import {SignupInfo} from "./models/signup-info";
import {environment} from "../../../environments/environment";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = environment.apiBaseUrl + '/auth/login';
  private registerUrl = environment.apiBaseUrl + '/auth/register';

  constructor(private http: HttpClient) {
  }


  login(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

  register(info: SignupInfo): Observable<string> {
    return this.http.post<string>(this.registerUrl, info, httpOptions);
  }
}
