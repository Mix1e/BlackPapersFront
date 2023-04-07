import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Paper } from '../../interfaces/paper';
import { Router } from '@angular/router';
import { PaperService } from '../../services/paper.service';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../interfaces/comment';
import { TokenStorageService } from '../../services/token-storage.service';
import { Viewer } from '../../interfaces/viewer';
import { ViewerService } from '../../services/viewer.service';
import { BehaviorSubject, map, Observable, switchMap, take } from "rxjs";

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsComponent implements OnInit {
    @Input() paper: Paper = {} as Paper;
    public newComment: Comment = {} as Comment;
    public role: string;
    public user: string;
    public comments$: BehaviorSubject<Comment[]> = new BehaviorSubject<Comment[]>([]);

    constructor(
        private router: Router,
        private commentService: CommentService,
        private token: TokenStorageService,
        private paperService: PaperService,
        private viewerService: ViewerService,
    ) {
        this.role = token.getAuthorities();
        this.user = token.getUsername();
    }

    ngOnInit(): void {
        this.loadComments();
    }

    private loadComments(): void {
        this.commentService
            .getCommentsByPaperId(this.paper.id)
            .pipe(
                take(1),
                map(
                    (comments: Comment[]) => comments.reverse(),
                ),
            )
            .subscribe((comments: Comment[]) => this.comments$.next(comments));
    }

    public addComment(): void {
        if (this.newComment.content) {
            this.viewerService
                .getViewer(this.token.getUsername())
                .pipe(
                    take(1),
                    switchMap((user: Viewer) =>
                        this.commentService.addComment({
                            paper: this.paper,
                            viewer: user,
                            content: this.newComment.content,
                        }),
                    ),
                )
                .subscribe({
                    next: () => this.loadComments(),
                });
        }
    }

    public likeComment(comment: Comment) {
        //FIXME
    }

    public deleteComment(id: number) {
        this.commentService.deleteComment(id).pipe(
            take(1),
        ).subscribe(
            () => this.loadComments(),
        );
    }
}
