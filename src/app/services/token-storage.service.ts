import { Injectable } from '@angular/core';
import {HttpHeaders} from "@angular/common/http";
import {Viewer} from "../interfaces/viewer";

const TOKEN_KEY = 'AuthToken';
const AUTHORITIES_KEY = 'AuthAuthorities';
const USERNAME_KEY = 'AuthUsername';
const USERDESCRIPTION_KEY = 'AuthDescription';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private role: string = "";
  constructor() { }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    // @ts-ignore
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUsername(username: string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }

  public getUsername(): string {
    // @ts-ignore
    return sessionStorage.getItem(USERNAME_KEY);
  }
  public saveDescription(description: string) {
    console.info(description);
    window.sessionStorage.removeItem(USERDESCRIPTION_KEY);
    window.sessionStorage.setItem(USERDESCRIPTION_KEY, description);
  }

  public getDescription(): string {
    // @ts-ignore
    return sessionStorage.getItem(USERDESCRIPTION_KEY);
  }

  public saveAuthorities(authorities: string) {
    console.log(authorities);
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string {
    this.role = "";

    if (sessionStorage.getItem(TOKEN_KEY)) {
      // @ts-ignore
      this.role = JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY));
    }

    return this.role;
  }
}
