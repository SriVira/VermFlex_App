import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';
import { ToastserviceService } from '../services/toastservice.service';

@Component({
  selector: 'app-recorddetails',
  templateUrl: './recorddetails.page.html',
  styleUrls: ['./recorddetails.page.scss'],
})
export class RecorddetailsPage implements OnInit {

  RecordId:any;
  ProjectId:any;
  RecordDetails:any;

  constructor(
    private route:ActivatedRoute,
    private location :Location,
    private ProjectService: FirebaseService,
    private message: ToastserviceService,
    private alertController :AlertController,

  ) { }

  ngOnInit() {
    this.message.LoadingMessage("Please Wait..","crescent");
    this.RecordId = this.route.snapshot.params["Rid"];
    this.ProjectId = this.route.snapshot.params["Pid"];
    this.GetProjectRecordDetails(this.ProjectId,this.RecordId);
  }

  GetProjectRecordDetails(Pid,Rid){

    this.ProjectService.GetProjectRecordDetails(Pid,Rid).subscribe(data=>{
        
      this.RecordDetails = data.map(e=>{
      
        return {
        RecordId:e.payload.doc.data()['RecordId'],
        BuildingNo:e.payload.doc.data()['BuildingNo'],
        FloorNo:e.payload.doc.data()['FloorNo'],
        ApartmentNo:e.payload.doc.data()['ApartmentNo'],
        RoomNo:e.payload.doc.data()['RoomNo'],
        Note:e.payload.doc.data()['Note'],
        Image1:e.payload.doc.data()['ImageUrl0'],
        Image2:e.payload.doc.data()['ImageUrl1'],
        Image3:e.payload.doc.data()['ImageUrl2'],
        Image4:e.payload.doc.data()['ImageUrl3'],
        Image5:e.payload.doc.data()['ImageUrl4']
        }
       
      })
      this.message.DismissLoadingMessage();
    })

  }

  async DeleteRecord(){


    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Do You Want to <strong>Delete</strong> This Record ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.ProjectService.DeleteRecord(this.ProjectId,this.RecordId);
            this.message.ShowToastMessage("Record Deleted !","danger");
            this.BackButton();

          }
        }
      ]
    });

    await alert.present();
  }


  BackButton(){
    this.location.back();
  }

}
