import {Component, Input, OnInit} from '@angular/core';
import {TokenStorageService} from "../../services/token-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  role: string = "";
  info: any;

  constructor(private token: TokenStorageService) { }

  ngOnInit() {
    if (this.token.getToken()) {
      this.role = this.token.getAuthorities();
    }
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
  }

  public logout() {
    this.token.signOut();
    window.location.reload();
  }
}
