import { ChangeDetectorRef, NgZone, Pipe, PipeTransform, OnDestroy } from '@angular/core';
import * as moment from 'moment';

moment.locale('es'); // set your language

@Pipe({
    name: 'timeAgo',
    pure: false
})
export class TimeAgoPipe implements PipeTransform, OnDestroy {
    private timer: number;
    constructor(private changeDetectorRef: ChangeDetectorRef, private ngZone: NgZone) {}
    transform(value: Date) {
        this.removeTimer();
        const d = new Date(value);
        const now = new Date();
        const seconds = Math.round(Math.abs((now.getTime() - d.getTime()) / 1000));
        const timeToUpdate = (Number.isNaN(seconds)) ? 1000 : this.getSecondsUntilUpdate(seconds) * 1000;
        this.timer = this.ngZone.runOutsideAngular(() => {
            if (typeof window !== 'undefined') {
                return window.setTimeout(() => {
                    this.ngZone.run(() => this.changeDetectorRef.markForCheck());
                }, timeToUpdate);
            }
            return null;
        });

        return moment(d).fromNow();

    }

    ngOnDestroy(): void {
        this.removeTimer();
    }

    private removeTimer() {
        if (this.timer) {
            window.clearTimeout(this.timer);
            this.timer = null;
        }
    }
    private getSecondsUntilUpdate(seconds: number) {
        const min = 60;
        const hr = min * 60;
        const day = hr * 24;
        if (seconds < min) { // less than 1 min, update every 2 secs
            return 2;
        } else if (seconds < hr) { // less than an hour, update every 30 secs
            return 30;
        } else if (seconds < day) { // less then a day, update every 5 mins
            return 300;
        } else { // update every hour
            return 3600;
        }
    }
}
