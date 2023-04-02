import { ChangeDetectionStrategy, Component } from "@angular/core";
import { TokenStorageService } from "../../services/token-storage.service";
import { Router, Scroll } from "@angular/router";
import { BehaviorSubject } from "rxjs";

type TRouteUrl = 'blogs' | 'create' | 'viewers' | 'about' | '';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
    public role$: BehaviorSubject<string> = new BehaviorSubject<string>('');
    public userName$: BehaviorSubject<string> = new BehaviorSubject<string>('');
    public currentPage$: BehaviorSubject<TRouteUrl> = new BehaviorSubject<TRouteUrl>('');

    constructor(private token: TokenStorageService, private router: Router) {
        this.router.events.subscribe((event) => {
            if (event instanceof Scroll) {
                const relativeUrl: string = event.routerEvent.urlAfterRedirects.split('/')[1];
                this.currentPage$.next(relativeUrl as TRouteUrl);
            }
        });

        if (this.token.getToken()) {
            this.role$.next(this.token.getAuthorities());
        }
        this.userName$.next(this.token.getUsername());
    }

    public logout() {
        this.role$.next('');
        this.token.signOut();
    }
}
