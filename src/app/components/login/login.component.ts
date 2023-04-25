import { Component, OnInit } from '@angular/core';
import { AuthLoginInfo } from '../auth/models/login-info';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    public loginInfo = {} as AuthLoginInfo;

    constructor(
        private authService: AuthService,
        private tokenStorage: TokenStorageService,
        private snackBar: MatSnackBar,
        private router: Router,
    ) {}

    ngOnInit() {}

    onSubmit() {
        if (this.loginInfo.username && this.loginInfo.password) {
            this.authService.login(this.loginInfo).subscribe(
                (data) => {
                    this.tokenStorage.saveToken(data.token);
                    this.tokenStorage.saveUsername(data.nickname);
                    this.tokenStorage.saveAuthorities(data.role);
                    this.tokenStorage.saveDescription(data.description);

                    this.homePage();
                },
                () => {
                    this.snackBar.open('Неверный логин или пароль', 'Переделаю', {
                        duration: 3000,
                        panelClass: ['errorBar'],
                    });
                },
            );
        } else
            this.snackBar.open('Заполните все поля', 'Хорошо', {
                duration: 3000,
                panelClass: ['errorBar'],
            });
    }

    homePage() {
        this.router.navigate(['/blogs']).then(() => location.reload());
    }
}
