import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Viewer } from '../interfaces/viewer';
import { environment } from '../../environments/environment';
import { TokenStorageService } from './token-storage.service';

@Injectable({
    providedIn: 'root',
})
export class ViewerService {
    private apiServerUrl = environment.apiBaseUrl + '/viewers';
    constructor(private http: HttpClient, private token: TokenStorageService) {}

    public getViewers(): Observable<Viewer[]> {
        let headers: HttpHeaders = new HttpHeaders();
        /*headers=headers.append('Access-Control-Allow-Origin', '*')
    headers = headers.append('Content-Type', 'application/json; charset=utf-8');
    */ headers = headers.append('Authorization', 'Bearer ' + this.token.getToken());

        return this.http.get<Viewer[]>(this.apiServerUrl, { headers });
    }

    public getViewer(viewerNickName: String): Observable<Viewer> {
        let headers: HttpHeaders = new HttpHeaders();
        /*headers=headers.append('Access-Control-Allow-Origin', '*')
    headers = headers.append('Content-Type', 'application/json; charset=utf-8');
    */ headers = headers.append('Authorization', 'Bearer ' + this.token.getToken());

        return this.http.get<Viewer>(this.apiServerUrl + '/' + viewerNickName, { headers });
    }

    public addViewer(viewer: Viewer): Observable<Viewer> {
        return this.http.post<Viewer>(this.apiServerUrl + '/create', viewer);
    }

    public updateViewer(viewer: Viewer): Observable<Viewer> {
        return this.http.put<Viewer>(this.apiServerUrl + '/update', viewer);
    }

    public deleteViewer(viewerNickName: String): Observable<void> {
        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Authorization', 'Bearer ' + this.token.getToken());
        return this.http.delete<void>(this.apiServerUrl + '/delete/' + viewerNickName, { headers });
    }
}
