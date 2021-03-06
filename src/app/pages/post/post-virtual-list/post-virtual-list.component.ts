import { CdkVirtualScrollViewport, ScrollDispatcher } from '@angular/cdk/scrolling';
import { AfterViewInit, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { IPost } from '@app/models/post';
import { PaginatorService } from '@app/services/paginator.service';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';

/*
https://stackblitz.com/edit/angular-cdk-demo-virtual-scroll?file=app%2Fvirtual-scroll%2Fvirtual-scroll.component.ts
https://stackblitz.com/edit/angular-custom-viewport-scroller?file=src%2Fapp%2Fcustom-viewport-scroller.ts
https://theangularpath.anirbanblogs.com/2021/06/angular-scroll-to-top-implementation.html
https://github.com/anirbmuk/angular-scroll-to-top.git
*/

@Component({
    selector: 'app-post-virtual-list',
    templateUrl: './post-virtual-list.component.html',
    styleUrls: ['./post-virtual-list.component.scss']
})
export class PostVirtualListComponent implements OnInit, AfterViewInit {

    @ViewChild(CdkVirtualScrollViewport, { static: false })
    viewport!: CdkVirtualScrollViewport;

    theEnd: boolean = false;
    data$: Observable<IPost[]> = this.page.data;

    visible$: Observable<boolean>;
    scrollPosition: number = 0;
    visible: boolean = false;

    constructor(
        private page: PaginatorService,
        private scrollDispatcher: ScrollDispatcher,
        private zone: NgZone,
    ) {

    }

    ngOnInit(): void {
        this.page.reset();
        this.page.init();
    }

    nextBatch() {
        if (this.theEnd) {
            return;
        }

        const end = this.viewport.getRenderedRange().end;
        const total = this.viewport.getDataLength();

        // console.log(`${end}, '>=', ${total}`);

        if (end === total && end != 0) {
            this.page.more();

        }
    }

    trackByIdx(i: any) {
        return i;
    }

    ngAfterViewInit(): void {

        this.visible$ = this.scrollDispatcher.scrolled()
            .pipe(
                map((event: any) => event.elementRef.nativeElement),
                filter((el: any) => el.tagName == "CDK-VIRTUAL-SCROLL-VIEWPORT"),
                map((el: any) => {

                    return this.zone.run(() => {
                        let scroll = el.scrollTop;
                        const offSet = 100;

                        switch (true) {
                            case scroll == 0: // TOP
                                this.visible = false;
                                break;
                            case (scroll) > (this.scrollPosition): // DOWN
                                this.visible = false;
                                break;
                            case (scroll) < (this.scrollPosition + offSet): // UP
                                this.visible = true;
                                break;

                            default:
                                this.visible = false;
                                break;
                        }

                        this.scrollPosition = scroll;

                        return this.visible;
                    })
                }),
                distinctUntilChanged()
            );
    }
}