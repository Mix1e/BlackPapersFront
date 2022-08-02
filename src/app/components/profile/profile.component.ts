import {Component, Input, OnInit} from '@angular/core';
import {TokenStorageService} from "../../services/token-storage.service";
import {ViewerService} from "../../services/viewer.service";
import {Viewer} from "../../interfaces/viewer";
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username: string;
  viewer = {} as Viewer;

  constructor(private token: TokenStorageService, private viewerService: ViewerService, private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar) {
    this.username = token.getUsername();
  }

  ngOnInit(): void {
    // @ts-ignore
    this.getViewer(this.route.snapshot.paramMap.get('id'));
    if (!this.viewer.nickName && !this.username)
      this.router.navigate(['/error']);
  }

  saveDescription() {
    this.viewerService.updateViewer(this.viewer).subscribe((value: Viewer) => {
      this.viewer = value
    });
    this.snackBar.open('Описание сохранено', 'ОК', {
      duration: 3000,
      panelClass: ['successBar']
    });
  }

  getViewer(user: string) {
    this.viewerService.getViewer(user).subscribe((value: Viewer) => {
      this.viewer = value
    })
  }

}
