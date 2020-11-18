import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { ToastserviceService } from '../services/toastservice.service';

@Component({
  selector: 'app-pendingprojects',
  templateUrl: './pendingprojects.page.html',
  styleUrls: ['./pendingprojects.page.scss'],
})
export class PendingprojectsPage implements OnInit {

  ProjectDetails:any;

  constructor(
    private router:Router,
    private ProjectService: FirebaseService,
    private message: ToastserviceService,
  ) { }

  ngOnInit() {
    this.GetPendingProjects("admin@vermflex.com");
  }

  

  GetPendingProjects(UserEmail){
    this.message.LoadingMessage("Please Wait..","crescent");
    this.ProjectService.GetPendingProjects(UserEmail).subscribe(data=>{
      
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
