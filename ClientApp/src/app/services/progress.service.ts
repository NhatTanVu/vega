import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BrowserXhr } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private uploadProgress: Subject<any> = new Subject();
  downloadProgress: Subject<any> = new Subject();

  constructor() { }

  startTracking() {
    this.uploadProgress = new Subject();
    return this.uploadProgress;
  }

  notify(progress) {
    this.uploadProgress.next(progress);
  }

  stopTracking() {
    this.uploadProgress.complete();
  }
}

@Injectable({
  providedIn: 'root'
})
export class BrowserXhrWithProgress extends BrowserXhr {

  constructor(private service: ProgressService) { 
    super();
  }

  build(): XMLHttpRequest {
    var xhr: XMLHttpRequest = super.build();
    
    xhr.onprogress = (event) => {
      this.service.notify(this.createProgress(event));
    };

    xhr.upload.onprogress = (event) => {
      this.service.notify(this.createProgress(event));
    };

    xhr.upload.onloadend = (event) => {
      this.service.stopTracking();
    };

    return xhr;
  }

  private createProgress(event) {
    return {
      total: event.total,
      percentage: Math.round(event.loaded / event.total * 100)
    };
  }
}