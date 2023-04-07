import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../interfaces/comment';
import { environment } from '../../environments/environment';
import { TokenStorageService } from './token-storage.service';

export type TCreateCommentRequest = Pick<Comment, 'viewer' | 'paper' | 'content'>;

@Injectable({
    providedIn: 'root',
})
export class CommentService {
    private apiServerUrl = environment.apiBaseUrl + '/comments';

    constructor(private http: HttpClient, private token: TokenStorageService) {}

    public getCommentsByPaperId(id: number): Observable<Comment[]> {
        let headers: HttpHeaders = new HttpHeaders();
        headers.append('Authorization', 'Bearer ' + this.token.getToken());
        return this.http.get<Comment[]>(this.apiServerUrl + '/' + id, { headers });
    }

    public addComment(comment: TCreateCommentRequest): Observable<Comment> {
        let headers: HttpHeaders = new HttpHeaders();
        headers.append('Authorization', 'Bearer ' + this.token.getToken());
        return this.http.post<Comment>(this.apiServerUrl + '/add', comment, { headers });
    }

    public deleteComment(commentId: number): Observable<void> {
        let headers: HttpHeaders = new HttpHeaders();
        headers.append('Authorization', 'Bearer ' + this.token.getToken());
        return this.http.delete<void>(this.apiServerUrl + '/delete/' + commentId, { headers });
    }
}
