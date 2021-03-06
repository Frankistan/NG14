import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginPageComponent } from './pages/auth/login/login-page.component';
import { RegisterPageComponent } from './pages/auth/register/register-page.component';
import { ForgotPasswordPageComponent } from './pages/auth/forgot-password/forgot-password-page.component';
import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate, AuthGuard } from '@angular/fire/auth-guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthComponent } from './pages/auth/auth.component';
import { VerifyEmailPageComponent } from './pages/auth/verify-email/verify-email-page.component';
import { SettingsPageComponent } from './pages/settings/settings.component';
import { PostComponent } from './pages/post/post.component';
import { PostFormComponent } from './pages/post/post-form/post-form.component';
import { PostShowComponent } from './pages/post/post-show/post-show.component';
import { PostVirtualListComponent } from './pages/post/post-virtual-list/post-virtual-list.component';
import { UploadComponent } from './layout/upload/upload.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/auth/login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['/posts']);

const routes: Routes = [
    {
        path: "dashboard",
        component: DashboardComponent,
        // canActivate: [AuthGuard],
        title: "title.home",
    },
    {
        path: "posts",
        component: PostComponent,
        canActivate: [],
        ...canActivate(redirectUnauthorizedToLogin),
        children: [
            {
                path: "",
                component: PostVirtualListComponent,
                title: "title.posts.list"
            },
            {
                path: "create",
                component: PostFormComponent,
                // canDeactivate: [DiscardChangesGuard],
                title: "title.posts.create"
            },

            {
                path: ":id",
                component: PostShowComponent,
                title: "title.posts.show"
            },
            {
                path: ":id/edit",
                component: PostFormComponent,
                // canDeactivate: [DiscardChangesGuard],
                title: "title.posts.edit"
            }],

    },
    {
        path: "settings",
        component: SettingsPageComponent,
        ...canActivate(redirectUnauthorizedToLogin),
        // canActivate: [AuthGuard],
        title: "title.settings"
    },
    {
        path: "uploads",
        component: UploadComponent,
        ...canActivate(redirectUnauthorizedToLogin),
        // canActivate: [AuthGuard],
        title: "title.uploads"
    },
    {
        path: "auth",
        component: AuthComponent,
        ...canActivate(redirectLoggedInToHome),
        children: [
            {
                path: "login",
                component: LoginPageComponent,
                title: "title.login"
            },
            {
                path: "signup",
                component: RegisterPageComponent,
                title: "title.signup"
            },
            {
                path: "forgot-password",
                component: ForgotPasswordPageComponent,
                title: "title.reset_password"
            },
            {
                path: "verify-email",
                component: VerifyEmailPageComponent,
                title: "title.verify_account"
            }
        ]
    },
    {
        path: "profile",
        ...canActivate(redirectUnauthorizedToLogin),
        component: ProfileComponent,
        title: "title.profile"
    },
    {
        path: "**",
        redirectTo: "auth/login",
        pathMatch: "full",
    },

    // { path: ", redirectTo: "/", pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
