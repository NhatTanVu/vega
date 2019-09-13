import { ErrorHandler, Inject, NgZone, isDevMode } from "@angular/core";
import { ToastyService } from 'ng2-toasty';
import * as Sentry from "@sentry/browser";

export class AppErrorHandler implements ErrorHandler {
    constructor(
        private ngZone: NgZone,
        @Inject(ToastyService) private toastyService: ToastyService) {
    }
    handleError(error: any): void {
        if (!isDevMode) {
            const eventId = Sentry.captureException(error.originalError || error);
            //Sentry.showReportDialog({ eventId });
        }
        else
            throw error;

        this.ngZone.run(() => {
            this.toastyService.error({
                title: 'Error',
                msg: 'An expected error happened.',
                theme: 'bootstrap',
                showClose: true,
                timeout: 5000
            });
        });
    }
}