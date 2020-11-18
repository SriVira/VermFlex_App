import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { ToastserviceService } from '../services/toastservice.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  LogEmail:any;
  RecentProjects: any;
  count:number;
  NumberOfProjectsCompleted:number;
  NumberOfProjectsPeding :number;

  constructor(
    private ProjectService: FirebaseService,
    private projectfirebase: AngularFirestore,
    private message: ToastserviceService,
    private router:Router
  ) {}

  ngOnInit() {
    this.LogEmail = localStorage.getItem("LogEmail");
    this.GetRecentProjects(this.LogEmail);
    this.CountOfProjectsCompleted(this.LogEmail);
    this.CountOfProjectsPeding(this.LogEmail)
  }

  GetRecentProjects(UserEmail){

    this.message.LoadingMessage("Please Wait..","crescent");
    this.ProjectService.GetRecentProjects(UserEmail).subscribe(data=>{
     
        this.RecentProjects = data.map(e=>{
        
          return {
          docid:e.payload.doc.data()['docid'],
          ProjectNo:e.payload.doc.data()['ProjectNo'],
          date:e.payload.doc.data()['date'],
          Status:e.payload.doc.data()['Status']
          }
         
        })
          
        this.message.DismissLoadingMessage();
    })

    
     
      
  }

 CountOfProjectsCompleted(UserEmail){

  this.ProjectService.GetCompletedProjects(UserEmail).subscribe(data=>{this.NumberOfProjectsCompleted =data.length})

  }

 CountOfProjectsPeding(UserEmail){

  this.ProjectService.GetPendingProjects(UserEmail).subscribe(data=>{this.NumberOfProjectsPeding =data.length})
  }

ProjectDetails(Docid){

  this.router.navigate(['/projectdetail/',Docid]);
}
  

}
