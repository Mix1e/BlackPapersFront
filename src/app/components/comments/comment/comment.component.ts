import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Comment, CommentsLikesTracking } from "../../../interfaces/comment";
import { Paper } from "../../../interfaces/paper";
import {
    CommentsLikesTrackingService,
    TCreateCommentsLikesTrackingRequest
} from "../../../services/comment-likes-tracking.service";
import { BehaviorSubject, filter, map, Observable, switchMap, take } from "rxjs";
import { LikeRequest } from "../../../interfaces/like-request";
import { CommentService } from "../../../services/comment.service";

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./../comments.component.css'],
})
export class CommentComponent implements OnInit {
    @Input() public comment!: Comment;
    @Input() public role!: string;
    @Input() public user!: string;
    @Input() public paper!: Paper;
    @Output() delete: EventEmitter<number> = new EventEmitter<number>();
    public tracker$: BehaviorSubject<CommentsLikesTracking> = new BehaviorSubject<CommentsLikesTracking>({} as CommentsLikesTracking);
    public comment$: BehaviorSubject<Comment> = new BehaviorSubject<Comment>({} as Comment);
    constructor(
        private trackingService: CommentsLikesTrackingService,
        private commentService: CommentService,
    ) {
    }

    public get likeRequest(): LikeRequest  {
        return { id: this.comment.id, nickName: this.user } as LikeRequest;
    }

    public ngOnInit(): void {
        this.comment$.next(this.comment);

        this.isControlExist().pipe(
            take(1),
            filter((isExist: boolean) => {
                if(!isExist) {
                    this.createControl();
                    return false;
                }
                return true;
            }),
            switchMap(
                () => this.trackingService.getControl(this.likeRequest)
            )
        ).subscribe(
            (commentsLikesTracking: CommentsLikesTracking) => this.tracker$.next(commentsLikesTracking),
        )
    }

    public canDelete(): boolean {
        return this.role === '[ROLE_ADMIN]' ||
            this.comment.viewer.nickName === this.user ||
            this.paper.viewer.nickName === this.user
    }

    private isControlExist(): Observable<boolean> {
        return this.trackingService.existControl(this.likeRequest)
    }

    public onLike() {
        this.trackingService
            .likeControl(this.likeRequest)
            .pipe(
                take(1),
            )
            .subscribe((commentsLikesTracking: CommentsLikesTracking ) => {
                this.tracker$.next(commentsLikesTracking);
                this.reloadComment(commentsLikesTracking.comment.id);
            });
    }

    public reloadComment(id: number): void {
        this.commentService.getCommentById(id).pipe(take(1)).subscribe(
            (response: Comment) => this.comment$.next(response),
        )
    }

    public isLiked(): Observable<boolean> {
        return this.tracker$.pipe(map((commentsLikesTracking: CommentsLikesTracking) => commentsLikesTracking.liked));
    }

    private createControl(): void {
        const createRequest: TCreateCommentsLikesTrackingRequest = {
            commentId: this.comment.id,
            viewerName: this.user,
            liked: false,
        }

        this.trackingService.addControl(createRequest).pipe(take(1)).subscribe(
            (commentsLikesTracking: CommentsLikesTracking) => this.tracker$.next(commentsLikesTracking),
        );
    }
}
