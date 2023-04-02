import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PapersComponent } from './components/papers/papers.component';
import { PostComponent } from './components/post/post.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ViewersComponent } from './components/viewers/viewers.component';
import { AboutComponent } from './components/about/about.component';
import { AddPaperComponent } from './components/add-paper/add-paper.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
  { path: '', redirectTo: 'blogs', pathMatch: 'full' },
  { path: 'blogs', component: PapersComponent },
  { path: 'blogs/:id', component: PostComponent },
  { path: 'viewers', component: ViewersComponent },
  { path: 'viewers/:id', component: ProfileComponent },
  { path: 'about', component: AboutComponent },
  { path: 'create', component: AddPaperComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: '/error' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
