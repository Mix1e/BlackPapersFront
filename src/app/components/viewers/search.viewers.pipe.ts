import {Pipe, PipeTransform} from "@angular/core";
import {Viewer} from "../../interfaces/viewer";

@Pipe({
  name: 'searchViewers'
})
export class SearchViewersPipe implements PipeTransform{
  transform(viewers: Viewer[], value: any): any {
    return viewers.filter(viewer => {
      return viewer.nickName.includes(value)
    });
  }
}
