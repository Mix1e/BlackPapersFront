import {Component, Input, OnInit} from '@angular/core';
import {PaperService} from "../../services/paper.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Paper} from "../../interfaces/paper";
import {Viewer} from "../../interfaces/viewer";
import {Comment} from "../../interfaces/comment";
import {Router} from "@angular/router";
import {CommentService} from "../../services/comment.service";
import {TokenStorageService} from "../../services/token-storage.service";

@Component({
  selector: 'app-papers',
  templateUrl: './papers.component.html',
  styleUrls: ['./papers.component.css']
})
export class PapersComponent implements OnInit {

  public papers: Paper[];
  searchStr: string = '';
  public role: string;
  public user: string;

  constructor(private paperService: PaperService, private commentService: CommentService, private token: TokenStorageService) {
    this.papers = [];
    this.role = token.getAuthorities();
    this.user = token.getUsername();
  }

  ngOnInit(): void {
    this.getPapers();
  }

  public getPapers() {
    this.paperService.getPapers().subscribe(
      (response: Paper[]) => {
        this.papers = response;
      }
    );
  }

  public deletePaper(id: number) {
    this.paperService.deletePaper(id).subscribe();
  }


}

