import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import {ToastserviceService} from'../services/toastservice.service'


@Component({
  selector: 'app-createproject',
  templateUrl: './createproject.page.html',
  styleUrls: ['./createproject.page.scss'],
})
export class CreateprojectPage implements OnInit {

  LogEmail:any;
  docid:string;
  ProjectNo: string;
  SiteName: string;
  ClientName: string;
  SiteAddress: string;
  PlotNo: string;
  AssignTo: string;
  Status: string;
  date:string;

  constructor
  (
    private ProjectService: FirebaseService,
    private projectfirebase: AngularFirestore,
    private message: ToastserviceService,
    private router:Router
     
  ) { }

  ngOnInit() {
    this.LogEmail = localStorage.getItem("LogEmail");
  }

   InsertProject(){

    if(this.ProjectNo == null || this.SiteName == null || this.ClientName == null || this.SiteAddress == null || this.PlotNo ==null){

      this.message.ShowToastMessage("Please Fill Details","danger");

    }else{
    this.message.LoadingMessage("Adding Project..","crescent");

    let ProjectDetails ={}
    var ADate = new Date();
    const Docid = this.projectfirebase.createId();
    ProjectDetails['docid'] = Docid;
    ProjectDetails['ProjectNo'] = this.ProjectNo ;
    ProjectDetails['SiteName'] = this.SiteName ;
    ProjectDetails['ClientName'] = this.ClientName ;
    ProjectDetails['SiteAddress'] =this.SiteAddress ;
    ProjectDetails['PlotNo'] = this.PlotNo ;
    ProjectDetails['AssignTo'] =this.LogEmail ;
    ProjectDetails['date'] = ADate.toDateString();
    ProjectDetails['Status'] = "Pending" ;
    ProjectDetails['createdAt'] = Date.now(); ;
    
    this.ProjectService.InsertProject(Docid,ProjectDetails).then(res =>{

      this.message.DismissLoadingMessage();
      this.message.ShowToastMessage("Project Added Success !","success");
      this.router.navigateByUrl("/home")
    
    }).catch(error =>{

      this.message.ShowToastMessage("Error While Adding..","danger")
      this.router.navigateByUrl("/home")
      
    });
  }
  }

 
  


  





}
