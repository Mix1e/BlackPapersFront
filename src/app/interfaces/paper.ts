import {Viewer} from "./viewer";
import {Comment} from "./comment";

export interface Paper {

  id:number;
  name:string;
  description:string;
  content:string;
  views:number;
  likes:number;
  dateOfUpdate: Date;
  viewer:Viewer;
}
