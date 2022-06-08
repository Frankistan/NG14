import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

    hide: boolean = true;
    form!: FormGroup;

    constructor(
        private _fb: FormBuilder,
        public auth: AuthService,
        private _rtr: Router,
    ) { }

    ngOnInit(): void {
        this.form = new FormGroup({
            email: new FormControl('test@example.com', [Validators.required, Validators.email]),
            password: new FormControl('123456', Validators.required),
            // recaptcha: new FormControl('', Validators.required),
            recaptcha: new FormControl('')
        });
    }

    save() {
        this.auth.login(this.form.value.email, this.form.value.password)
            .then(_ => this._rtr.navigate(['/posts']));
    }

    socialLogin(provider: string) {
        this.auth.socialLogin(provider).then(_ => this._rtr.navigate(['/posts']));
    }

}