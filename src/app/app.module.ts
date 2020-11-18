import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouteReuseStrategy } from '@angular/router';
import {FormsModule} from '@angular/forms'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import{ IonicStorageModule} from '@ionic/storage'

import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { File } from '@ionic-native/File/ngx';
import { MediaCapture } from '@ionic-native/media-capture/ngx';
import { Media } from '@ionic-native/media/ngx';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

//firebase
import{ AngularFireModule} from '@angular/fire'
import{ AngularFirestoreModule} from '@angular/fire/firestore'
import { AngularFireStorageModule} from '@angular/fire/storage'
import { AngularFireAuthModule} from '@angular/fire/auth'
//env
import { environment } from 'src/environments/environment';
import { from } from 'rxjs';
//services
//import { FirebaseService} from 'src/app/services/firebase.service'

export function createTranslateLoader(http:HttpClient){
  return new TranslateHttpLoader(http,'assets/lang/','.json')
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    IonicStorageModule.forRoot(
      {
        name: '__mydb',
  driverOrder: ['indexeddb', 'sqlite', 'websql']
      }
    ),
    TranslateModule.forRoot({
      loader:{
          provide :TranslateLoader,
          useFactory : (createTranslateLoader),
          deps:[HttpClient]
      }
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    AngularFireStorageModule,
    AngularFireAuthModule
    
  ],
  providers: [
    StatusBar,
    ImagePicker,
    MediaCapture,
    File,
    Media,
    StreamingMedia,
    PhotoViewer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
