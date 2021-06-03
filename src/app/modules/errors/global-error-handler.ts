import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {NotificationService} from '../../shared/services/notification.service';

@Injectable()
export class GlobalErrorHandler implements  ErrorHandler {

  constructor(private notifier: NotificationService) {
  }

  handleError(error: Error): void {
    this.notifier.showError(error.message);
    console.error(error);
  }

}
