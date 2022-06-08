import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressComponent } from './address/address.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginPageComponent } from './pages/auth/login/login-page.component';
import { RegisterPageComponent } from './pages/auth/register/register-page.component';
import { ResetPasswordPageComponent } from './pages/auth/reset-password/reset-password-page.component';
import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate, AuthGuard } from '@angular/fire/auth-guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthComponent } from './pages/auth/auth.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { VerifyAccountPageComponent } from './pages/auth/verify-account/verify-account-page.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/auth/login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['/posts']);

const routes: Routes = [
    {
        path: "dashboard",
        component: DashboardComponent,
        // canActivate: [AuthGuard],
        title: "title.home"
    },
    {
        path: "settings",
        component: SettingsComponent,
        // canActivate: [AuthGuard],
        title: "title.settings"
    },
    {
        path: "auth",
        component: AuthComponent,
        // ...canActivate(redirectLoggedInToHome),
        children: [
            {
                path: "login",
                component: LoginPageComponent,
                title: 'title.login'
            },
            {
                path: "signup",
                component: RegisterPageComponent,
                title: 'title.signup'
            },
            {
                path: "reset-password",
                component: ResetPasswordPageComponent,
                title: 'title.reset_password'
            },
            {
                path: "verify-account",
                component: VerifyAccountPageComponent,
                title: 'title.verify_account'
            }
        ]
    },
    {
        path: 'profile',
        canActivate: [AuthGuard],
        component: ProfileComponent,
        title: "title.profile"
    },
    {
        path: "**",
        redirectTo: "auth/login",
        pathMatch: "full",
    },

    // { path: '', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
