import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';
import { ToastserviceService } from '../services/toastservice.service';
import { Location } from "@angular/common";

@Component({
  selector: 'app-projectdetail',
  templateUrl: './projectdetail.page.html',
  styleUrls: ['./projectdetail.page.scss'],
})
export class ProjectdetailPage implements OnInit {

  DocId:any;
  ProjectDetails:any;
  ProjectRecords:any;
  page = 1;

  constructor(
    private route:ActivatedRoute,
    private ProjectService: FirebaseService,
    private message: ToastserviceService,
    private alertController :AlertController,
    private location :Location,
    private router:Router,
    
  
    ) { }

  ngOnInit() {
    this.message.LoadingMessage("Please Wait..","crescent");
    this.DocId = this.route.snapshot.params["docid"];
    console.log(this.DocId);
    this.GetProjectDetails(this.DocId,"admin@vermflex.com");
    this.GetProjectRecords(this.DocId,0);
    
  }

  GetProjectDetails(Docid,UserEmail){
    
      this.ProjectService.GetProjectsDetalis(Docid,UserEmail).subscribe(data=>{
        
        this.ProjectDetails = data.map(e=>{
        
          return {
          docid:e.payload.doc.data()['docid'],
          ProjectNo:e.payload.doc.data()['ProjectNo'],
          ProjectName:e.payload.doc.data()['ProjectNo'],
          ClientName:e.payload.doc.data()['ClientName'],
          PlotNo:e.payload.doc.data()['PlotNo'],
          Status:e.payload.doc.data()['Status']
          }
         
        })
      
      })

  }

  GetProjectRecords(ProjectID,Limit){
    
    this.ProjectService.GetProjectRecords(ProjectID,Limit).subscribe(data=>{
     
        this.ProjectRecords = data.map(e=>{
        
          return {
          Recordid:e.payload.doc.data()['RecordId'],
          BuildingNo:e.payload.doc.data()['BuildingNo'],
          FloorNo:e.payload.doc.data()['FloorNo'],
          ApartmentNo:e.payload.doc.data()['ApartmentNo'],
          RoomNo:e.payload.doc.data()['RoomNo']
          }
         
        })
          
        this.message.DismissLoadingMessage();
    })

  }

  async DeleteProject(docid){


    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Do You Want to <strong>Delete</strong> This Project ?',
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
            this.ProjectService.DeleteProject(docid);
            this.message.ShowToastMessage("Project Deleted !","danger");
            this.BackButton();

          }
        }
      ]
    });

    await alert.present();
  }

  MarkProjectAsCompleted(docid){

    this.message.LoadingMessage("Updating Project..","crescent");

    let ProjectDetails ={}

    ProjectDetails['Status'] = "Completed" ;
  
    
    this.ProjectService.MarkProjectAsCompleted(docid,ProjectDetails).then(res =>{

      this.message.DismissLoadingMessage();
      this.message.ShowToastMessage("Project Update Success !","success");
      
    
    }).catch(error =>{

      this.message.ShowToastMessage("Error While Updating..","danger")
    
      
    });



  }

  BackButton(){
    this.location.back();
  }

  CreateNewRecord(Docid){
    this.router.navigate(['/newrecord/',Docid]);
  }

  RecordDetails(Pid,Rid){

    this.router.navigate(['/recorddetails/',Pid,Rid]);

  }



}
