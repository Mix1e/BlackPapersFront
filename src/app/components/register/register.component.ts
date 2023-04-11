import { Component, OnInit } from '@angular/core';
import { SignupInfo } from '../auth/models/signup-info';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
    signupInfo = {} as SignupInfo;

    constructor(
        private authService: AuthService,
        private router: Router,
        private snackBar: MatSnackBar,
    ) {}

    ngOnInit() {}

    onSubmit() {
        if (this.signupInfo.username && this.signupInfo.password && this.signupInfo.description) {
            this.authService.register(this.signupInfo).subscribe(
                (data) => {
                    this.snackBar.open('Регистрация прошла успешно', 'ОК', {
                        duration: 3000,
                        panelClass: ['successBar'],
                    });
                    this.toLogin();
                },
                (error) => {
                    this.snackBar.open(error.error.message, 'Хорошо', {
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

    toLogin() {
        this.router.navigate(['/login']);
    }
}
