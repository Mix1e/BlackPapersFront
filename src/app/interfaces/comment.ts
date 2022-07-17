import {Paper} from "./paper";
import {Viewer} from "./viewer";

export interface Comment {
  id: number;
  paper: Paper;
  content: string;
  likes: number;
  viewer: Viewer;
  dateOfUpdate: Date;
}
