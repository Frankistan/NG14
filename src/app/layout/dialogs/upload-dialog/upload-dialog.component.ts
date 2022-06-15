import { Component, HostListener, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/*
https://blog.angular-university.io/angular-material-dialog/
https://dev.to/nicolus/closing-a-modal-with-the-back-button-in-ionic-5-angular-9-50pk
*/

@Component({
    selector: 'app-upload-dialog',
    templateUrl: './upload-dialog.component.html',
    styleUrls: ['./upload-dialog.component.scss']
})
export class UploadDialogComponent implements OnInit, OnDestroy {

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<UploadDialogComponent>
    ) { }

    ngOnInit() {
        const modalState = {
            modal: true,
            desc: 'fake state for our modal'
        };
        history.pushState(modalState, null);
    }
    
    ngOnDestroy() {
        if (window.history.state.modal) {
            history.back();
        }
    }

    @HostListener('window:popstate', ['$event'])
    dismissModal() {
        this.dialogRef.close(true);
    }

    onClose(): void {
        this.dialogRef.close(true);
    }

}
