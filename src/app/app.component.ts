import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { LanguageService } from './services/language.service';
import { Capacitor, Plugins} from '@capacitor/core'
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    public router:Router,
    private languageService : LanguageService,
    private Istoreage :Storage
   
  ) {
    this.initializeApp();
    
  }

 

  initializeApp() {
    this.checklogin();
    this.platform.ready().then(() => {
      if(Capacitor.isPluginAvailable('SplashScreen')){
        Plugins.SplashScreen.hide();
      }
      this.statusBar.styleDefault();
      this.languageService.setInitialAppLanguage();
     
    });
  }

  checklogin(){

    this.Istoreage.get('IsLogin').then((val) => {
      console.log('Your IsLogin is', val);
      if(val=="true"){
        this.router.navigateByUrl("/home");
      }
    });
  }
  

}
