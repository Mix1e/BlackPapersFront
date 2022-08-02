import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router, UrlSegment} from "@angular/router";
import {Paper} from "../../interfaces/paper";
import {PaperService} from "../../services/paper.service";
import {Observable} from "rxjs";
import {TokenStorageService} from "../../services/token-storage.service";
import {Control} from "../../interfaces/control";
import {ViewerService} from "../../services/viewer.service";
import {ControlService} from "../../services/control.service";
import {Viewer} from "../../interfaces/viewer";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  public paper = {} as Paper
  public info: any
  public control = {} as Control
  public clicked: boolean

  constructor(private route: ActivatedRoute, private paperService: PaperService, private token: TokenStorageService,
              private viewerService: ViewerService, private controlService: ControlService, private router: Router) {

    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities(),
      paperId: this.route.snapshot.paramMap.get('id')
    };
    this.clicked = false;
  }

  ngOnInit(): void {
    this.getPaper(this.info.paperId);
    this.getViewer(this.info.username);
    this.doControl();
  }

  private doControl(): void {
    this.controlService.existControl(this.info.paperId, this.info.username).subscribe(value => {
      if (!value) {
        this.paperService.getPaperById(this.info.paperId).subscribe(value => {
          this.control.paper = value
          this.control.liked = false;
          this.controlService.addControl(this.control).subscribe(value => {
              this.control = value
            }
          );
        })
      }
      else {
        this.controlService.getControl(this.info.paperId, this.info.username).subscribe(value1 =>
        {
          this.control = value1
        })
      }
    })
  }

  public getPaper(id: number) {
    this.paperService.getPaperById(id).subscribe(
      value => {
      this.paper = value
    })
  }

  public getViewer(name: string) {
    this.viewerService.getViewer(name).subscribe(
      value => {
        this.control.viewer = value
      }
    );
  }

  public deletePaper(id: number) {
    this.paperService.deletePaper(id).subscribe();
    this.router.navigate(["/blogs"]).then(() => {
      window.location.reload();
    });
  }

  public isLiked() {
    this.clicked = !this.clicked;
    // @ts-ignore
    this.control = this.controlService.getControl(this.info.paperId, this.info.username).subscribe(
      value => {
        this.controlService.likeControl(value).subscribe(
          value => {
            this.control = value;
          }
        );
      }
    );
  }
}
