import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { IPost } from '@app/models/post';
import { IUser } from '@app/models/user';
import { AuthService } from '@app/services/auth.service';
import { I18nService } from '@app/services/i18n.service';
import { PostService } from '@app/services/post.service';
import { ProfileService } from '@app/services/profile.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
    selector: 'app-post-show',
    templateUrl: './post-show.component.html',
    styleUrls: ['./post-show.component.scss']
})
export class PostShowComponent implements OnInit {
    post$: Observable<IPost>;
    locale: string;
    isBookMarked$: Observable<boolean>;
    user: IUser;
    id: string;


    constructor(
        private _postService: PostService,
        private _activatedRoute: ActivatedRoute,
        public sanitizer: DomSanitizer,
        private _i18n: I18nService,
        private _auth: AuthService,
        private _profile: ProfileService
    ) { }

    ngOnInit(): void {
        this.locale = this._i18n.language;
        this.id = this._activatedRoute.snapshot.params['id'];
        this.post$ = this._postService.read(this.id);
        this.isBookMarked$ = this._auth.loggedInUser$.pipe(map((user: IUser) => {

            this.user = user;
            if (this.user.bookmarks == undefined) this.user.bookmarks = [];
            return !!user.bookmarks.find(x => x == this.id);
        }));
    }

    bookmark(state: boolean) {

        if (state) {
            this.user.bookmarks.push(this.id);
        } else {
            if (this.user.bookmarks.findIndex(item => item === this.id) >= 0)
                this.user.bookmarks.splice(this.user.bookmarks.findIndex(item => item === this.id), 1);
        }

        this._auth.bookmarks(this.user.bookmarks);

    }

}
