import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TokenStorageService } from './token-storage.service';
import { Control } from '../interfaces/control';
import { LikeRequest } from "../interfaces/like-request";
import { CommentsLikesTracking } from "../interfaces/comment";

export type TCreateCommentsLikesTrackingRequest = Pick<CommentsLikesTracking,  'liked'> & {
    commentId: number;
    viewerName: string;
};

@Injectable({
    providedIn: 'root',
})
export class CommentsLikesTrackingService {
    private apiServerUrl = environment.apiBaseUrl + '/comments/tracking';

    constructor(private http: HttpClient, private token: TokenStorageService) {}

    public getControl(likeRequest: LikeRequest): Observable<CommentsLikesTracking> {
        let headers: HttpHeaders = new HttpHeaders();
        headers.append('Authorization', 'Bearer ' + this.token.getToken());
        return this.http.get<CommentsLikesTracking>(this.apiServerUrl + '/' + likeRequest.id + '/' + likeRequest.nickName, {
            headers,
        });
    }

    public addControl(createRequest: TCreateCommentsLikesTrackingRequest): Observable<CommentsLikesTracking> {
        let headers: HttpHeaders = new HttpHeaders();
        headers.append('Authorization', 'Bearer ' + this.token.getToken());
        return this.http.post<CommentsLikesTracking>(this.apiServerUrl + '/add', createRequest, { headers });
    }

    public updateControl(control: CommentsLikesTracking): Observable<CommentsLikesTracking> {
        let headers: HttpHeaders = new HttpHeaders();
        headers.append('Authorization', 'Bearer ' + this.token.getToken());
        return this.http.put<CommentsLikesTracking>(this.apiServerUrl + '/update', control, { headers });
    }

    public existControl(likeRequest: LikeRequest): Observable<boolean> {
        let headers: HttpHeaders = new HttpHeaders();
        headers.append('Authorization', 'Bearer ' + this.token.getToken());
        return this.http.get<boolean>(this.apiServerUrl + '/exist/' + likeRequest.id + '/' + likeRequest.nickName, {
            headers,
        });
    }

    public likeControl(likeRequest: LikeRequest): Observable<CommentsLikesTracking> {
        let headers: HttpHeaders = new HttpHeaders();
        headers.append('Authorization', 'Bearer ' + this.token.getToken());
        return this.http.put<CommentsLikesTracking>(this.apiServerUrl + '/like', likeRequest, { headers });
    }
}
