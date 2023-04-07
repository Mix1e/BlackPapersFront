import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../services/token-storage.service';
import { ViewerService } from '../../services/viewer.service';
import { Viewer } from '../../interfaces/viewer';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Observable, switchMap, take } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
    public form: FormGroup = ProfileComponent.newForm();
    public user$: Observable<Viewer>;
    public isCurrentUserPage$: Observable<boolean>;

    public get currentUserName(): string {
        return this.token.getUsername();
    }

    public get urlNickName(): string {
        return this.route.snapshot.paramMap.get('id') ?? '';
    }

    public get descriptionControl(): FormControl {
        return this.form.get('description') as FormControl;
    }

    constructor(
        private token: TokenStorageService,
        private viewerService: ViewerService,
        private route: ActivatedRoute,
        private router: Router,
        private snackBar: MatSnackBar,
    ) {
        this.user$ = this.viewerService.getViewer(this.urlNickName);
        this.user$
            .pipe(take(1))
            .subscribe((user: Viewer) => this.descriptionControl.patchValue(user.description));

        this.isCurrentUserPage$ = this.user$.pipe(
            map((user: Viewer) => user.nickName === this.currentUserName),
        );
    }

    ngOnInit(): void {
        // if (!this.currentUserName) this.router.navigate(['/error']);
    }

    saveDescription() {
        if (!this.form.valid) {
            this.snackBar.open('Заполните всё что надо, пж', 'ОК', {
                duration: 3000,
            });
            return;
        }

        this.user$
            .pipe(
                take(1),
                switchMap((user: Viewer) =>
                    this.viewerService.updateViewer({
                        ...user,
                        description: this.descriptionControl.value,
                    }),
                ),
            )
            .subscribe({
                complete: () => this.showNotify(),
            });
    }

    private showNotify() {
        this.snackBar.open('Описание сохранено', 'ОК', {
            duration: 3000,
            panelClass: ['successBar'],
        });
    }

    private static newForm(): FormGroup {
        return new FormGroup({
            description: new FormControl(null, [Validators.required]),
        });
    }
}
