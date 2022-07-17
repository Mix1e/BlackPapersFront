import { Component, OnInit } from '@angular/core';
import {PaperService} from "./paper.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Paper} from "./paper";

@Component({
  selector: 'app-papers',
  templateUrl: './papers.component.html',
  styleUrls: ['./papers.component.css']
})
export class PapersComponent implements OnInit {

  public papers: Paper[] | undefined;

  constructor(private paperService: PaperService) {
  }

  ngOnInit(): void {
    this.getPapers();
  }

  public getPapers(): void {
    this.paperService.getPapers().subscribe(
      (response: Paper[]) => {
        this.papers = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


}
