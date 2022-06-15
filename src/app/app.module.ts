import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomFirebaseModule } from './modules/custom-firebase.module';
import { CustomMaterialModule } from './modules/custom-material.module';
import { CustomTinymceModule } from './modules/custom-tinymce.module';
import { AddressComponent } from './address/address.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { ForgotPasswordPageComponent } from './pages/auth/forgot-password/forgot-password-page.component';
import { VerifyEmailPageComponent } from './pages/auth/verify-email/verify-email-page.component';
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
import { ProfileService } from './services/profile.service';
import { PostFormComponent } from './pages/post/post-form/post-form.component';
import { PostShowComponent } from './pages/post/post-show/post-show.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UploadComponent } from './layout/upload/upload.component';
import { FileUploadService } from './services/file-upload.service';
import { UploadSelectorComponent } from './layout/upload/upload-selector/upload-selector.component';
import { CameraComponent } from './layout/upload/camera/camera.component';
import { ImageEditorComponent } from './layout/upload/image-editor/image-editor.component';
import { DropzoneComponent } from './layout/dropzone/dropzone.component';
import { DropzoneDirective } from './directives/dropzone.directive';
import { WebcamModule } from 'ngx-webcam';
import { ImageCropperModule } from 'ngx-image-cropper';
import { UploadDialogComponent } from './layout/dialogs/upload-dialog/upload-dialog.component';

/*
https://github.com/Frankistan/ng14fireblog
https://console.firebase.google.com/
https://openbase.com/
https://fonts.google.com/icons
https://material.angular.io/
https://icons8.com/icon/12599/github
https://fontawesomeicons.com/svg/icons/google-firebase
https://www.flaticon.es/packs/google-2
https://tburleson-layouts-demos.firebaseapp.com/
https://css2sass.herokuapp.com/

// LAYOUT
https://codepen.io/osublake/pen/dMLQJr
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
        ForgotPasswordPageComponent,
        VerifyEmailPageComponent,
        AuthComponent,
        SettingsPageComponent,
        FabCreatePostComponent,
        FabEditPostComponent,
        FabScrollToTopComponent,
        PostComponent,
        PostVirtualElementComponent,
        PostVirtualListComponent,
        PostFormComponent,
        PostShowComponent,
        ProfileComponent,
        UploadComponent,
        UploadSelectorComponent,
        CameraComponent,
        ImageEditorComponent,
        DropzoneComponent,
        DropzoneDirective,
        UploadDialogComponent,

    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        CustomFirebaseModule,
        CustomMaterialModule,
        CustomTinymceModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        FormsModule,
        TranslateModule.forRoot(),
        MomentModule,
        ImageCropperModule,
        WebcamModule,
    ],
    entryComponents: [UploadDialogComponent],
    providers: [
        AuthService,
        NotificationService,
        SettingsService,
        I18nService,
        ProfileService,
        FileUploadService,
        {
            provide: TitleStrategy,
            useClass: TranslateTitleStrategy
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
