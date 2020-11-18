import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {  AngularFireStorage } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private projectfirebase :AngularFirestore, private storageRef :AngularFireStorage ) { }

  //Inset project
  InsertProject(Dicid,ProjectDetalis){
    return this.projectfirebase.collection("Projects").doc(Dicid).set(ProjectDetalis);
  }
  //GetRecentProjects
  GetRecentProjects(UserEmail){
    return this.projectfirebase.collection('Projects',ref => ref.where('AssignTo','==',UserEmail).orderBy('createdAt','desc').limit(5)).snapshotChanges();
  }
  //GetPendingProjects
  GetPendingProjects(UserEmail){
    return this.projectfirebase.collection('Projects',ref => ref.where('AssignTo','==',UserEmail).where('Status','==',"Pending")).snapshotChanges();
  }
  //GetCompletedProjects
  GetCompletedProjects(UserEmail){
    return this.projectfirebase.collection('Projects',ref => ref.where('AssignTo','==',UserEmail).where('Status','==',"Completed")).snapshotChanges();
  }
  //GetProjectDetails
  GetProjectsDetalis(Docid,UserEmail){
    return this.projectfirebase.collection('Projects',ref => ref.where('AssignTo','==',UserEmail).where('docid','==',Docid)).snapshotChanges();
  }
  //MarkProjectAsCompleted
  MarkProjectAsCompleted(Dicid,ProjectDetalis){
    return this.projectfirebase.collection("Projects").doc(Dicid).update(ProjectDetalis);
  }
  //DeleteProject
  DeleteProject(DocId){
    this.projectfirebase.collection('Projects').doc(DocId).delete();
  }


  //InsetProjectRecord
  InsetProjectRecord(ProjectId,RecordId,RecordDetails){
    return this.projectfirebase.collection('Projects').doc(ProjectId).collection("ProjectRecord").doc(RecordId).set(RecordDetails);
  }

   //GetProjectRecords
   GetProjectRecords(ProiectId,Limit){
    return this.projectfirebase.collection('Projects').doc(ProiectId).collection('ProjectRecord',ref => ref.orderBy('createdAt','desc')).snapshotChanges();
  }
  //GetProjectRecordDetails
  GetProjectRecordDetails(ProjectId,RecordId){
    return this.projectfirebase.collection('Projects').doc(ProjectId).collection('ProjectRecord',ref => ref.where('RecordId','==',RecordId)).snapshotChanges();
  }

  UpdateImageRecordDetails(ProjectID,RecordId,ImageDetails){
    return this.projectfirebase.collection("Projects").doc(ProjectID).collection("ProjectRecord").doc(RecordId).update(ImageDetails);
  }

  //DeleteRecord
  DeleteRecord(Pid,Rid){
    this.projectfirebase.collection('Projects').doc(Pid).collection("ProjectRecord").doc(Rid).delete();
  }

}
