import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastserviceService {

  loading

  constructor(
    private loadingctrl :LoadingController,
    private toast : ToastController
  ) { }




async LoadingMessage(message,spinnertype){

       this.loading = await this.loadingctrl.create({
        message:message,
        spinner:spinnertype,
        cssClass:'loaingcintroller',
        showBackdrop :true
      });
      this.loading.present();
  }

async DismissLoadingMessage(){

    this.loading.dismiss();
  }

async ShowToastMessage(message,color){

  
    const toast = await this.toast.create({
      message: message,
      duration: 2000,
      color: color,
      position:"bottom"
    });
    toast.present();

}


}
