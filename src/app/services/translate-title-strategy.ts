import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { environment } from '@env/environment';
import { TranslateService } from '@ngx-translate/core';
import { I18nService } from './i18n.service';

/*
https://kevinkreuzer.medium.com/angulars-new-router-title-feature-612ddbbf8495
*/

@Injectable({
    providedIn: 'root'
})
export class TranslateTitleStrategy extends TitleStrategy {

    constructor(private readonly title: Title, private translateService: TranslateService, private i18nService: I18nService) {
        super();
        i18nService.init(environment.defaultLanguage, environment.supportedLanguages);
    }

    override updateTitle(routerState: RouterStateSnapshot) {
        const title: any = this.buildTitle(routerState);

        this.title.setTitle(this.translateService.instant(title));
    }
}
