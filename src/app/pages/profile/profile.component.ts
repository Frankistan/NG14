import { DOCUMENT } from '@angular/common';
import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AuthService } from '@app/services/auth.service';

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
export class ProfileComponent implements OnInit {

    // @ViewChild("profile") el: ElementRef;

    user$ = this._auth.loggedInUser$;

    constructor(
        private _auth: AuthService,
        private el: ElementRef<HTMLElement>,

        private renderer: Renderer2,
    ) { }

    ngOnInit(): void {

        // Manipulate via Renderer2
        // this.renderer.setStyle(this.el.nativeElement, 'background', '#d515a0');
    }

    handleButtonClick(e: any) {

        const buttons = document.querySelectorAll(".card-buttons button");
        const sections = document.querySelectorAll(".card-section");
        const card = document.querySelector(".card");
        const targetSection = e.target.getAttribute("data-section");
        const section = document.querySelector(targetSection);

        targetSection !== "#about"
            ? card.classList.add("is-active")
            : card.classList.remove("is-active");
        card.setAttribute("data-state", targetSection);
        sections.forEach((s) => s.classList.remove("is-active"));
        buttons.forEach((b) => b.classList.remove("is-active"));
        e.target.classList.add("is-active");
        section.classList.add("is-active");

    }


    // const buttons = document.querySelectorAll(".card-buttons button");
    // const sections = document.querySelectorAll(".card-section");
    // const card = document.querySelector(".card");


    ngAfterViewInit(): void {


        setTimeout(() => {
            let sections = this.el.nativeElement.querySelectorAll(".card-section");
            let buttons = this.el.nativeElement.querySelectorAll(".card-buttons button");
            let card = this.el.nativeElement.querySelector(".card");

            sections.forEach((value, key) => {
                console.log("section:", value)
            });

        }, 1000)


        // this.el.nativeElement.querySelectorAll(".card-section");

    }


}
