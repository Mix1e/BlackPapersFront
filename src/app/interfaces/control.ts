import { Paper } from './paper';
import { Viewer } from './viewer';

export interface Control {
    id: number;
    paper: Paper;
    viewer: Viewer;
    liked: boolean;
}
