import { Component, } from '@angular/core';
import { PaperService } from '../../services/paper.service';
import { Paper } from '../../interfaces/paper';
import { Viewer } from '../../interfaces/viewer';
import { TokenStorageService } from '../../services/token-storage.service';
import { ViewerService } from '../../services/viewer.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from "rxjs";

@Component({
    selector: 'app-add-paper',
    templateUrl: './add-paper.component.html',
    styleUrls: ['./add-paper.component.css'],
})
export class AddPaperComponent {
    newPaper = {} as Paper;
    viewer = {} as Viewer;
    nick: string;

    constructor(
        private paperService: PaperService,
        private token: TokenStorageService,
        private viewerService: ViewerService,
        private router: Router,
        private snackBar: MatSnackBar,
    ) {
        this.nick = token.getUsername();
        this.getViewerByNick();
    }

    addPaper(): void {
        if (this.newPaper.name && this.newPaper.description && this.newPaper.content) {
            this.newPaper.likes = 0;
            this.newPaper.views = 0;
            this.newPaper.viewer = this.viewer;
            this.paperService.addPaper(this.newPaper).pipe(take(1)).subscribe(
                () => this.homePage(),
            );
        } else
            this.snackBar.open('Заполните все поля', 'Хорошо', {
                duration: 3000,
                panelClass: ['errorBar'],
            });
    }

    getViewerByNick() {
        this.viewerService.getViewer(this.nick).subscribe((value: Viewer) => {
            this.viewer = value;
        });
    }

    homePage(): void {
        this.router.navigate(['/blogs']).then();
    }
}
