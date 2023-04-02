import { Viewer } from './viewer';

export interface Paper {
    id: number;
    name: string;
    description: string;
    content: string;
    views: number;
    likes: number;
    updated: Date;
    viewer: Viewer;
}
