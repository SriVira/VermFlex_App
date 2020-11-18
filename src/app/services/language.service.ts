import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

const LANG_KEY = 'SELECTED_LANGUAGE'

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  selected = '';

  constructor(private translate :TranslateService,private storage:Storage) { }


  setInitialAppLanguage(){

    let language = this.translate.getBrowserLang();
    this.translate.setDefaultLang(language);

    this.storage.get(LANG_KEY).then(val=>{

      if(val){
        this.setLanguage(val);
        this.selected = val;
      }

    });
  
  }

  setLanguage(lng){
      this.translate.use('en');
      this.selected = lng;
      this.storage.set(LANG_KEY,lng);
  }
  
}

