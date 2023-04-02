import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PapersComponent } from './components/papers/papers.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { PostComponent } from './components/post/post.component';
import { CommentsComponent } from './components/comments/comments.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from './components/papers/search.pipe';
import { ViewersComponent } from './components/viewers/viewers.component';
import { AboutComponent } from './components/about/about.component';
import { AddPaperComponent } from './components/add-paper/add-paper.component';
import { SearchViewersPipe } from './components/viewers/search.viewers.pipe';
import { httpInterceptorProviders } from './components/auth/auth-interceptor';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
    declarations: [
        AppComponent,
        PapersComponent,
        FooterComponent,
        HeaderComponent,
        PostComponent,
        CommentsComponent,
        ProfileComponent,
        SearchPipe,
        SearchViewersPipe,
        ViewersComponent,
        AboutComponent,
        AddPaperComponent,
        RegisterComponent,
        LoginComponent,
        ErrorComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        NoopAnimationsModule,
        MatSnackBarModule,
    ],
    providers: [httpInterceptorProviders],
    bootstrap: [AppComponent],
})
export class AppModule {}
