import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Paper } from '../../interfaces/paper';
import { PaperService } from '../../services/paper.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { Control } from '../../interfaces/control';
import { ViewerService } from '../../services/viewer.service';
import { ControlService } from '../../services/control.service';
import { combineLatest, filter, map, Observable, switchMap, take } from "rxjs";
import { Viewer } from "../../interfaces/viewer";

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
    public control$: Observable<Control>;
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

    constructor(
        private route: ActivatedRoute,
        private paperService: PaperService,
        private token: TokenStorageService,
        private viewerService: ViewerService,
        private controlService: ControlService,
        private router: Router,
    ) {
        this.paper$ = this.getPaper(this.paperId);
        this.control$ = this.getControl();

    }

    ngOnInit(): void {
        //this.getViewer(this.userName);
    }

    private getControl(): Observable<Control> {
        return this.controlService
            .existControl(this.paperId, this.userName).pipe(
                take(1),
                filter(
                    (isExist: boolean) => {
                        if(!isExist) {
                            this.paperService.getPaperById(this.paperId).pipe(
                                take(1),
                                switchMap(
                                    (paper: Paper) => {
                                        // @ts-ignore
                                        const control: Control = {
                                            paper: paper,
                                            liked: false,
                                        }
                                        return this.controlService.addControl(control);
                                    }
                                ),
                            ).subscribe((value) => {
                                console.log(value);
                            });
                            return false;
                        }
                        return true;
                    },
                ),
                switchMap(
                    () => this.controlService
                        .getControl(this.paperId, this.userName)
                ),
            )
    }

    public getLikesCount(paper: Paper): number {
        return paper.likes;
    }

    public canDelete(paper: Paper): boolean {
        return this.authorities === '[ROLE_ADMIN]' || paper.viewer.nickName === this.userName;
    }

    public isLiked(): Observable<boolean> {
        return this.control$.pipe(
            map(
                (control: Control) => control.liked,
            ),
        )
    }

    public onLike() {
        this.control$ = this.controlService
            .getControl(this.paperId, this.userName).pipe(
                take(1),
                switchMap(
                    (control: Control) =>  this.controlService.likeControl(control),
                ),
            )
    }

    public getPaper(id: number): Observable<Paper> {
        return this.paperService.getPaperById(id);
    }

    public getViewer(name: string): Observable<Viewer> {
        return this.viewerService.getViewer(name);
    }

    public deletePaper(id: number) {
        this.paperService.deletePaper(id).pipe(take(1)).subscribe({
            complete: () => this.router.navigate(['/blogs']).then(),
        });
    }
}
