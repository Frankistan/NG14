import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomFirebaseModule } from './modules/custom-firebase.module';
import { CustomMaterialModule } from './modules/custom-material.module';
import { CustomTinymceModule } from './modules/custom-tinymce.module';
import { AddressComponent } from './address/address.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatSidenavListComponent } from './layout/mat-sidenav-list/mat-sidenav-list.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { I18nService } from './services/i18n.service';
import { TitleStrategy } from '@angular/router';
import { TranslateTitleStrategy } from './services/translate-title-strategy';
import { BtnLanguageComponent } from './layout/btn-language/btn-language.component';
import { RegisterPageComponent } from './pages/auth/register/register-page.component';
import { ResetPasswordPageComponent } from './pages/auth/reset-password/reset-password-page.component';
import { VerifyAccountPageComponent } from './pages/auth/verify-account/verify-account-page.component';
import { LoginPageComponent } from './pages/auth/login/login-page.component';
import { AuthService } from './services/auth.service';
import { AuthComponent } from './pages/auth/auth.component';
import { SettingsPageComponent } from './pages/settings/settings.component';
import { NotificationService } from './services/notification.service';
import { PostComponent } from './pages/post/post.component';
import { MomentModule } from "ngx-moment";
import { FabCreatePostComponent } from './layout/fab-create-post/fab-create-post.component';
import { FabEditPostComponent } from './layout/fab-edit-post/fab-edit-post.component';
import { FabScrollToTopComponent } from './layout/fab-scroll-to-top/fab-scroll-to-top.component';
import { PostVirtualElementComponent } from './pages/post/post-virtual-list/post-virtual-element/post-virtual-element.component';
import { PostVirtualListComponent } from './pages/post/post-virtual-list/post-virtual-list.component';
import { SettingsService } from './services/settings.service';

/*
https://github.com/Frankistan/ng14fireblog
https://console.firebase.google.com/
https://openbase.com/
https://fonts.google.com/icons
https://material.angular.io/
https://tburleson-layouts-demos.firebaseapp.com/
https://css2sass.herokuapp.com/
https://tburleson-layouts-demos.firebaseapp.com/#/docs

*/

@NgModule({
    declarations: [
        AppComponent,
        AddressComponent,
        DashboardComponent,
        MatSidenavListComponent,
        ToolbarComponent,
        BtnLanguageComponent,
        LoginPageComponent,
        RegisterPageComponent,
        ResetPasswordPageComponent,
        VerifyAccountPageComponent,
        AuthComponent,
        SettingsPageComponent,
        PostComponent,
        FabCreatePostComponent,
        FabEditPostComponent,
        FabScrollToTopComponent,
        PostVirtualElementComponent,
        PostVirtualListComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        CustomFirebaseModule,
        CustomMaterialModule,
        CustomTinymceModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        MomentModule,
    ],
    providers: [
        AuthService,
        NotificationService,
        SettingsService,
        I18nService,
        {
            provide: TitleStrategy,
            useClass: TranslateTitleStrategy
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
