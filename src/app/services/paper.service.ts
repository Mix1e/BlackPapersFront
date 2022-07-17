import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Paper} from "./paper";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PaperService {

  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  public getPapers(): Observable<Paper[]> {
    return this.http.get<Paper[]>(this.apiServerUrl + '/blogs');
  }

  public addPaper(paper: Paper): Observable<Paper> {
    return this.http.post<Paper>(this.apiServerUrl +'/create', paper);
  }

  public updatePaper(paper: Paper): Observable<Paper> {
    return this.http.put<Paper>(this.apiServerUrl +'/update', paper);
  }

  public deletePaper(paperId: number): Observable<void> {
    return this.http.delete<void>(this.apiServerUrl+ '/delete' + paperId);
  }
}
