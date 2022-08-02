import { Component, OnInit, Input } from '@angular/core';
import {Paper} from "../../interfaces/paper";
import {ActivatedRoute, Router} from "@angular/router";
import {PaperService} from "../../services/paper.service";
import {CommentService} from "../../services/comment.service";
import {Comment} from "../../interfaces/comment";
import {TokenStorageService} from "../../services/token-storage.service";
import {Viewer} from "../../interfaces/viewer";
import {ViewerService} from "../../services/viewer.service";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {

  public comments = {} as Comment[];
  public newComment = {} as Comment;
  @Input() paper= {} as Paper;
  public role: string;
  public user: string;
  private viewer = {} as Viewer

  constructor(private router: Router, private commentService: CommentService, private token: TokenStorageService,
              private paperService: PaperService, private viewerService: ViewerService) {
    this.role = token.getAuthorities();
    this.user = token.getUsername();
  }

  ngOnInit(): void {
    this.getComments();
    this.getViewer(this.user);
  }


  public getComments() {
    this.commentService.getCommentsByPaperId(this.paper.id).subscribe(value => {
      this.comments = value
    })
  }

  public addComment(): void {
    if (this.newComment.content) {
      this.newComment.paper = this.paper;
      this.newComment.viewer = this.viewer;
      this.newComment.likes = 0;
      this.commentService.addComment(this.newComment).subscribe();
      location.reload();
    }
  }

  public deleteComment(id: number) {
    this.commentService.deleteComment(id).subscribe();
    location.reload();
  }


  public getViewer(name: string) {
    this.viewerService.getViewer(name).subscribe(
      value => this.viewer = value
    );
  }

}
