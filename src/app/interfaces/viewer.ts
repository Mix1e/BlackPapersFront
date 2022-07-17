import {Comment} from "./comment";
import {Paper} from "./paper";

export interface Viewer {

  nickName:string;
  password:string;
  role:string;
  description:string;
  comments:Comment[] | undefined;
  papers:Paper[] | undefined;
}
