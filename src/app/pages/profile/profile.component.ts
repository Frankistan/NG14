import { Component, ElementRef, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UploadDialogComponent } from '@app/layout/dialogs/upload-dialog/upload-dialog.component';
import { IUser } from '@app/models/user';
import { AuthService } from '@app/services/auth.service';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

/*
https://www.delftstack.com/es/howto/angular/element-find-by-class-in-angular/
https://ultimatecourses.com/blog/element-refs-in-angular-templates
https://stackblitz.com/edit/angular-get-el-by-class-name?file=src%2Fapp%2Fapp.component.ts

https://codepen.io/rdesigncode/pen/qBVXOMX -- copiar el diseño
https://codepen.io/hirun_dinukshana/pen/bGozzBL -- ver el fondo de colores
https://codepen.io/RRoberts/pen/jMLRBg   -- copiar parte del diseño
*/

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnDestroy{

    private destroy = new Subject<void>();

    user$ = this._auth.loggedInUser$;

    constructor(
        private _auth: AuthService,
        private dialog: MatDialog,
    ) { }

    handleButtonClick(event: any) {

        const buttons = document.querySelectorAll(".card-buttons button");
        const sections = document.querySelectorAll(".card-section");
        const card = document.querySelector("#profile");
        const targetSection = event.target.getAttribute("data-section");
        const section = document.querySelector(targetSection);
        const figcaption = document.querySelectorAll("figcaption")[0];

        targetSection !== "#about"
            ? card.classList.add("is-active")
            : card.classList.remove("is-active");

        targetSection !== "#about" ? figcaption.classList.add("none") : figcaption.classList.remove("none");

        card.setAttribute("data-state", targetSection);
        sections.forEach((s) => s.classList.remove("is-active"));
        buttons.forEach((b) => b.classList.remove("is-active"));
        event.target.classList.add("is-active");
        section.classList.add("is-active");

    }

    openDialog(user: IUser) {
        const dialogRef = this.dialog.open(UploadDialogComponent, {
            data: user,
            panelClass: ['custom-mat-dialog'],
            hasBackdrop: true,
            closeOnNavigation: true
        });

        dialogRef.afterClosed().pipe(
            map(result => {
                if (!result) return false;
                return result.answer;
            }),
            takeUntil(this.destroy))
            .subscribe(res => { if (res) return; });
    }

    ngOnDestroy(): void {
        this.destroy.next();
    }
}
