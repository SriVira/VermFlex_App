import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';
import { ToastserviceService } from '../services/toastservice.service';
import { Location } from "@angular/common";

@Component({
  selector: 'app-completedprojects',
  templateUrl: './completedprojects.page.html',
  styleUrls: ['./completedprojects.page.scss'],
})
export class CompletedprojectsPage implements OnInit {

  ProjectDetails:any;
  constructor(
    private router:Router,
    private ProjectService: FirebaseService,
    private message: ToastserviceService,
    
  ) { }

  ngOnInit() {

    this.GetCompletedProjects("admin@vermflex.com");

  }
  
  GetCompletedProjects(UserEmail){
    this.message.LoadingMessage("Please Wait..","crescent");
    this.ProjectService.GetCompletedProjects(UserEmail).subscribe(data=>{
      
      this.ProjectDetails = data.map(e=>{
        return {

        docid:e.payload.doc.data()['docid'],
        ProjectNo:e.payload.doc.data()['ProjectNo'],
        ProjectName:e.payload.doc.data()['ProjectNo'],
        ClientName:e.payload.doc.data()['ClientName'],
        date:e.payload.doc.data()['date'],
        Status:e.payload.doc.data()['Status']

        }
       
      })
      this.message.DismissLoadingMessage();
    })

  }

  ProjectDetailsSingle(Docid){

    this.router.navigate(['/projectdetail/',Docid]);
  
    }
}
