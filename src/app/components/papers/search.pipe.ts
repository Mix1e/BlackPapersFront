import {Pipe, PipeTransform} from "@angular/core";
import {Paper} from "../interfaces/paper";

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform{
  transform(papers: Paper[], value: any): any {
    return papers.filter(paper => {
      return paper.name.includes(value)
    });
  }
}
