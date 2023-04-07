import { Component, OnInit } from '@angular/core';
import * as dayjs from "dayjs";

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
    year: number;
    constructor() {
        this.year = dayjs().year();
    }

    ngOnInit(): void {}
}
