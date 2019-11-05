import { Component } from '@angular/core';
import { InAppBrowser, InAppBrowserObject, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private iab: InAppBrowser) { }
  browser: InAppBrowserObject;

  message: string;

  OnBrowserOpen(target) {
    const opt: InAppBrowserOptions = {
      hardwareback: 'no',
      hidenavigationbuttons: 'yes',
      hidespinner: 'yes',
      hidden: 'yes',
      location: 'no',
      usewkwebview: 'no'

    };

    this.browser = this.iab.create('https://ilfotoalbum.maxict.it/browser.php', target, opt);

    this.browser.on('message').subscribe(
      mex => {
        console.log(mex);
        this.message = mex.message;
      }
    );


    this.browser.on('loadstop').subscribe(event => {
      this.browser.insertCSS({ code: 'body{color: red;' });
      this.browser.executeScript(
        {
          code: '\
      var message = \'this is the message\';\
      var messageObj = {my_message: message};\
      var stringifiedMessageObj = JSON.stringify(messageObj);\
      webkit.messageHandlers.cordova_iab.postMessage(stringifiedMessageObj);'
        }
      );
      this.browser.show();
    });
  }

}
