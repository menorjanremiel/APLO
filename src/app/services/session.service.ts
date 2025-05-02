import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Code here will only run in the browser
      const sessionData: any = sessionStorage.getItem('raw');
      // ... rest of your code
    } else {
      console.error('Not running in a browser environment');
    }
  }

  decodeToken(token: any): any {
    var base64ToParse = atob(token);
    const jsonParse = JSON.parse(base64ToParse);
    return jsonParse;
  }

  encodeData(data: any) {
    var base64ToEncode = btoa(JSON.stringify(data));
    return base64ToEncode;
  }

  decodeData(data: any) {
    var base64ToParse = atob(JSON.parse(data));
    const jsonParse = JSON.parse(base64ToParse);
    return jsonParse;
  }

  uploadToSession(data: any) {
    sessionStorage.setItem('raw', data);
  }

  getSessionData(): any {
    if (isPlatformBrowser(this.platformId)) {
      // Code here will only run in the browser
      const sessionData: any = sessionStorage.getItem('raw');
      return sessionData;
    } else {
      console.error('Not running in a browser environment');
    }
  }

  deleteData() {
    sessionStorage.removeItem('raw');
  }
}
