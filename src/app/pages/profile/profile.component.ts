import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/services/auth.service';

/*

https://codepen.io/rdesigncode/pen/qBVXOMX -- copiar el diseño
https://codepen.io/hirun_dinukshana/pen/bGozzBL -- ver el fondo de colores
https://codepen.io/RRoberts/pen/jMLRBg   -- copiar parte del diseño
*/

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    user$ = this._auth.loggedInUser$;

    constructor(private _auth: AuthService) { }

    ngOnInit(): void {


    }

}
