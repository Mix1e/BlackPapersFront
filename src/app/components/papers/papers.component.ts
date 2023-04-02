import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PaperService } from '../../services/paper.service';
import { Paper } from '../../interfaces/paper';
import { CommentService } from '../../services/comment.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { BehaviorSubject, switchMap, take } from "rxjs";

@Component({
    selector: 'app-papers',
    templateUrl: './papers.component.html',
    styleUrls: ['./papers.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PapersComponent {
    public papers$: BehaviorSubject<Paper[]> = new BehaviorSubject<Paper[]>([]);
    searchStr: string = '';
    public role: string;
    public user: string;

    constructor(
        private paperService: PaperService,
        private commentService: CommentService,
        private token: TokenStorageService,
    ) {
        this.paperService.getPapers().pipe(take(1)).subscribe(
            (papers: Paper[]) => this.papers$.next(papers),
        );
        this.role = token.getAuthorities();
        this.user = token.getUsername();
    }

    public deletePaper(id: number) {
        this.paperService.deletePaper(id).pipe(
            take(1),
            switchMap(
                () => this.paperService.getPapers()
            )
        ).subscribe(
            (papers: Paper[]) => this.papers$.next(papers),
        );
    }
}
