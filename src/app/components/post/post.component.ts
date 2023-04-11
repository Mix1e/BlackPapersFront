import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Paper } from "../../interfaces/paper";
import { PaperService } from "../../services/paper.service";
import { TokenStorageService } from "../../services/token-storage.service";
import { Control } from "../../interfaces/control";
import { ViewerService } from "../../services/viewer.service";
import { ControlService, TCreateControlRequest } from "../../services/control.service";
import { BehaviorSubject, filter, map, Observable, switchMap, take } from "rxjs";
import { LikeRequest } from "../../interfaces/like-request";

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent implements OnInit {
    public control$: BehaviorSubject<Control> = new BehaviorSubject<Control>({} as Control);
    public paper$: Observable<Paper>;

    public get isAuthorized(): boolean {
        return !!this.token.getToken();
    }

    public get authorities(): string {
        return this.token.getAuthorities();
    }

    public get userName(): string {
        return this.token.getUsername();
    }

    public get paperId(): number {
        const id: string = this.route.snapshot.paramMap.get('id') ?? '';
        return +id;
    }

    public get likeRequest(): LikeRequest  {
        return { paperId: this.paperId, nickName: this.userName } as LikeRequest;
    }

    constructor(
        private route: ActivatedRoute,
        private paperService: PaperService,
        private token: TokenStorageService,
        private viewerService: ViewerService,
        private controlService: ControlService,
        private router: Router,
    ) {
        this.paper$ = this.getPaper(this.paperId);
    }

    ngOnInit(): void {
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
                () => this.controlService.getControl(this.likeRequest)
            )
        ).subscribe(
            (control: Control) => this.control$.next(control),
        )
    }

    public getLikesCount(paper: Paper): number {
        return paper.likes;
    }

    public canDelete(paper: Paper): boolean {
        return this.authorities === '[ROLE_ADMIN]' || paper.viewer.nickName === this.userName;
    }

    public isLiked(): Observable<boolean> {
        return this.control$.pipe(map((control: Control) => control.liked));
    }

    public onLike() {
        this.controlService
            .likeControl(this.likeRequest)
            .pipe(
                take(1),
            )
            .subscribe((control: Control) => {
                this.control$.next(control);
                this.paper$ = this.getPaper(this.paperId);
            });
    }

    public getPaper(id: number): Observable<Paper> {
        return this.paperService.getPaperById(id);
    }

    public deletePaper(id: number) {
        this.paperService
            .deletePaper(id)
            .pipe(take(1))
            .subscribe({
                complete: () => this.router.navigate(['/blogs']).then(),
            });
    }

    private createControl(): void {
        const createRequest: TCreateControlRequest = {
            paperId: this.paperId,
            viewerName: this.userName,
            liked: false,
        }

        this.controlService.addControl(createRequest).pipe(take(1)).subscribe(
            (control: Control) => this.control$.next(control),
        );
    }

    private isControlExist(): Observable<boolean> {
        return this.controlService.existControl(this.likeRequest)
    }
}
