import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable, map, shareReplay } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    @ViewChild('drawer', { static: true }) public drawer!: MatSidenav;

    user$!: Observable<any>;
    isAuthenticated$!: Observable<boolean>;

    isHandset$: Observable<boolean> = this._bpo.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches),
            shareReplay()
        );

    constructor(
        private _bpo: BreakpointObserver,
        private _auth: AuthService,
    ) { }

    ngOnInit() {

        this.user$ = this._auth.loggedInUser$;

        this.isAuthenticated$ = this._auth.isAuthenticated$;

    }
}
