import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-mat-sidenav-list',
    templateUrl: './mat-sidenav-list.component.html',
    styleUrls: ['./mat-sidenav-list.component.scss']
})
export class MatSidenavListComponent implements OnInit {

    @Input() drawer!: MatSidenav;

    private destroy = new Subject<void>();

    isHandset$: Observable<boolean> = this._bpo.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches),
            shareReplay()
        );

    constructor(
        private _bpo: BreakpointObserver,
        private _auth: AuthService,
        private _rtr: Router,
    ) { }

    ngOnInit(): void { }

    close() {
        this.isHandset$
            .pipe(takeUntil(this.destroy))
            .subscribe(result => {
                if (result) this.drawer.close();
            });
    }

    logout() {
        this._auth.logout().then(_ => this._rtr.navigate(['/auth/login']));
    }

}
