import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Paper} from "../interfaces/paper";
import {environment} from "../../environments/environment";
import {TokenStorageService} from "./token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class PaperService {

  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient, private token: TokenStorageService) { }

  public getPapers(): Observable<Paper[]> {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Authorization', "Bearer " + this.token.getToken());
    return this.http.get<Paper[]>(this.apiServerUrl + '/blogs', {headers});
  }

  public getPaperById(paperId: number): Observable<Paper> {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Authorization', "Bearer " + this.token.getToken());
    return this.http.get<Paper>(this.apiServerUrl + '/blogs/' + paperId);
  }

  public addPaper(paper: Paper): Observable<Paper> {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Authorization', "Bearer " + this.token.getToken());
    return this.http.post<Paper>(this.apiServerUrl +'/create', paper, {headers});
  }

  public updatePaper(paper: Paper): Observable<Paper> {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Authorization', "Bearer " + this.token.getToken());
    return this.http.put<Paper>(this.apiServerUrl +'/update', paper, {headers});
  }

  public deletePaper(paperId: number): Observable<void> {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Authorization', "Bearer " + this.token.getToken());
    return this.http.delete<void>(this.apiServerUrl+ '/delete/' + paperId, {headers});
  }
}
