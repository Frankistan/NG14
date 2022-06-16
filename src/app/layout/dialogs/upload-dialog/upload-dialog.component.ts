import { Component, HostListener, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdDirective } from '@app/directives/ad.directive';
import { AdItem } from '@app/models/ad-item';
import { FileUploadService } from '@app/services/file-upload.service';
import { AdComponent } from '@app/models/ad';
import { AdVertComponent } from '@app/test/ad-vert/ad-vert.component';
import { HeroComponent } from '@app/test/hero/hero.component';
import { VillainComponent } from '@app/test/villain/villain.component';
import { DropzoneComponent } from '@app/layout/dropzone/dropzone.component';

/*
https://blog.angular-university.io/angular-material-dialog/
https://dev.to/nicolus/closing-a-modal-with-the-back-button-in-ionic-5-angular-9-50pk



load component dynamically
https://angular.io/generated/live-examples/dynamic-component-loader/stackblitz.html
https://stackblogger.com/dynamic-components-angular/

mat-dialog-content mat-card {
    h: 694px; / y: 668px
 
    w: 514px; / x: 722px
}

*/

@Component({
    selector: 'app-upload-dialog',
    templateUrl: './upload-dialog.component.html',
    styleUrls: ['./upload-dialog.component.scss']
})
export class UploadDialogComponent implements OnInit, OnDestroy {

    currentAdIndex = -1;

    tabs: AdItem[] = [
        new AdItem(
            DropzoneComponent,
            { icon: "laptop", label: "upload.dialog.pc" }
        ),
        new AdItem(
            VillainComponent,
            { icon: "language", label: "URL" },
        ),
        new AdItem(
            AdVertComponent,
            { icon: "linked_camera", label: "upload.dialog.camera" },
        )
    ];

    activeLink = this.tabs[0];

    @ViewChild(AdDirective, { static: true }) adHost!: AdDirective;

    // @HostListener('window:popstate', ['$event'])
    // dismissModal() {
    //     this.dialogRef.close(true);
    // }

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<UploadDialogComponent>,
        public fus: FileUploadService
    ) { }

    ngOnInit() {

        this.loadTabContent(0);

        const modalState = {
            modal: true,
            desc: 'fake state for our modal'
        };
        history.pushState(modalState, null);
    }

    loadTabContent(index: any) {

        const adItem = this.tabs[index];
        const viewContainerRef = this.adHost.viewContainerRef;

        viewContainerRef.clear();

        const componentRef = viewContainerRef.createComponent<AdComponent>(this.tabs[index].component);

        componentRef.instance.data = adItem.data;

    }

    onClose(): void {
        this.dialogRef.close(true);
    }

    ngOnDestroy() {
        if (window.history.state.modal) {
            history.back();
        }
    }

}
