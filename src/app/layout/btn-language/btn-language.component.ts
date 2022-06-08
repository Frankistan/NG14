import { Component, OnInit } from '@angular/core';
import { I18nService } from '@app/services/i18n.service';

@Component({
    selector: 'btn-language',
    templateUrl: './btn-language.component.html',
    styleUrls: ['./btn-language.component.scss']
})
export class BtnLanguageComponent implements OnInit {

    constructor(private i18nService: I18nService) { }

    ngOnInit() { }

    setLanguage(language: string) {
        this.i18nService.language = language;
    }

    get currentLanguage(): string {
        return this.i18nService.language;
    }

    get languages(): string[] {
        return this.i18nService.supportedLanguages;
    }

}
