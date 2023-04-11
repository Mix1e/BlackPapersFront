import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TokenStorageService } from './token-storage.service';
import { Control } from '../interfaces/control';
import { LikeRequest } from "../interfaces/like-request";

export type TCreateControlRequest = Pick<Control,  'liked'> & {
    paperId: number;
    viewerName: string;
};

@Injectable({
    providedIn: 'root',
})
export class ControlService {
    private apiServerUrl = environment.apiBaseUrl + '/control';

    constructor(private http: HttpClient, private token: TokenStorageService) {}

    public getControl(likeRequest: LikeRequest): Observable<Control> {
        let headers: HttpHeaders = new HttpHeaders();
        headers.append('Authorization', 'Bearer ' + this.token.getToken());
        return this.http.get<Control>(this.apiServerUrl + '/' + likeRequest.paperId + '/' + likeRequest.nickName, {
            headers,
        });
    }

    public addControl(createRequest: TCreateControlRequest): Observable<Control> {
        let headers: HttpHeaders = new HttpHeaders();
        headers.append('Authorization', 'Bearer ' + this.token.getToken());
        return this.http.post<Control>(this.apiServerUrl + '/add', createRequest, { headers });
    }

    public updateControl(control: Control): Observable<Control> {
        let headers: HttpHeaders = new HttpHeaders();
        headers.append('Authorization', 'Bearer ' + this.token.getToken());
        return this.http.put<Control>(this.apiServerUrl + '/update', control, { headers });
    }

    public existControl(likeRequest: LikeRequest): Observable<boolean> {
        let headers: HttpHeaders = new HttpHeaders();
        headers.append('Authorization', 'Bearer ' + this.token.getToken());
        return this.http.get<boolean>(this.apiServerUrl + '/exist/' + likeRequest.paperId + '/' + likeRequest.nickName, {
            headers,
        });
    }

    public likeControl(likeRequest: LikeRequest): Observable<Control> {
        let headers: HttpHeaders = new HttpHeaders();
        headers.append('Authorization', 'Bearer ' + this.token.getToken());
        return this.http.put<Control>(this.apiServerUrl + '/like', likeRequest, { headers });
    }
}
