import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '@app/services/file-upload.service';

/*
load component dynamically
https://angular.io/guide/dynamic-component-loader
*/

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {

    constructor(public fus: FileUploadService) { }

    ngOnInit(): void {
    }

}
