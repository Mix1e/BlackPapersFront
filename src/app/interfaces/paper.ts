import {Viewer} from "./viewer";
import {Comment} from "./comment";

export interface Paper {

  id:number;
  name:string;
  description:string;
  content:string;
  views:number;
  likes:number;
  tag:string;
  comments:Comment[] | undefined;
  viewer:Viewer | undefined;
  dateOfUpdate: Date;
}
