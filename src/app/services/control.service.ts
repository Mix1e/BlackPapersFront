import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {TokenStorageService} from "./token-storage.service";
import {Control} from "../interfaces/control";


@Injectable({
  providedIn: 'root'
})
export class ControlService {

  private apiServerUrl = environment.apiBaseUrl + '/control';

  constructor(private http: HttpClient, private token: TokenStorageService) {
  }

  public getControl(paperId: number, nickName:string): Observable<Control> {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Authorization', "Bearer " + this.token.getToken());
    return this.http.get<Control>(this.apiServerUrl + '/' + paperId + "/" + nickName, {headers});
  }

  public addControl(control: Control): Observable<Control> {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Authorization', "Bearer " + this.token.getToken());
    return this.http.post<Control>(this.apiServerUrl +'/add', control, {headers});
  }

  public updateControl(control: Control): Observable<Control> {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Authorization', "Bearer " + this.token.getToken());
    return this.http.put<Control>(this.apiServerUrl +'/update', control, {headers});
  }

  public existControl(paperId: number, nickName: string) : Observable<boolean> {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Authorization', "Bearer " + this.token.getToken());
    return this.http.get<boolean>(this.apiServerUrl +'/exist/'+paperId + "/" + nickName, {headers});
  }

  public likeControl(control: Control) : Observable<Control> {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Authorization', "Bearer " + this.token.getToken());
    return this.http.put<Control>(this.apiServerUrl +'/like', control, {headers});
  }
}
