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
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavListComponent } from './layout/mat-sidenav-list/mat-sidenav-list.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { FlexLayoutModule } from '@angular/flex-layout';

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
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CustomMaterialModule,
        CustomFirebaseModule,
        CustomTinymceModule,
        FlexLayoutModule,
        ReactiveFormsModule,


    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
