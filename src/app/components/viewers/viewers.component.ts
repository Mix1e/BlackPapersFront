import { Component, OnInit } from '@angular/core';
import { Viewer } from '../../interfaces/viewer';
import { ViewerService } from '../../services/viewer.service';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
    selector: 'app-viewers',
    templateUrl: './viewers.component.html',
    styleUrls: ['./viewers.component.css'],
})
export class ViewersComponent implements OnInit {
    viewers: Viewer[] = [];
    searchViewersStr: string = '';
    username: string;
    role: string;

    constructor(private viewerService: ViewerService, private token: TokenStorageService) {
        this.username = token.getUsername();
        this.getViewers();
        this.role = token.getAuthorities();
    }

    ngOnInit(): void {}

    public getViewers(): void {
        this.viewerService.getViewers().subscribe((response: Viewer[]) => {
            this.viewers = response;
        });
    }

    public deleteViewer(nickName: string) {
        this.viewerService.deleteViewer(nickName).subscribe();
    }
}
