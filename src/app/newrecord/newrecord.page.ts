import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { ToastserviceService } from '../services/toastservice.service';


import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import {
  MediaCapture,
  MediaFile,
  CaptureError
} from '@ionic-native/media-capture/ngx';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { AngularFireStorage } from '@angular/fire/storage';


 

@Component({
  selector: 'app-newrecord',
  templateUrl: './newrecord.page.html',
  styleUrls: ['./newrecord.page.scss'],
})
export class NewrecordPage implements OnInit {

  ProjectId:any;
  BuildingNo: string;
  FloorNo:string;
  ApartmentNo:string;
  RoomNo:string;
  Note:string;
  files = [];
  RecordId:any;
  MEDIA_FOLDER_NAME:any;
  ImagePaths =[];
  ImageURL =[];
  uplaodProgress=0

  AllRecordData = [];
  AllFiles =[];

  AllImagesData = []

  constructor(
    private location :Location,
    private route:ActivatedRoute,
    private ProjectService: FirebaseService,
    private projectfirebase: AngularFirestore,
    private message: ToastserviceService,

    private imagePicker: ImagePicker,
    private mediaCapture: MediaCapture,
    private file: File,
    private media: Media,
    private streamingMedia: StreamingMedia,
    private photoViewer: PhotoViewer,
    private actionSheetController: ActionSheetController,
    private plt: Platform,
    private storage :AngularFireStorage

  ) { }

  ngOnInit() {
    this.ProjectId = this.route.snapshot.params["projectid"];
    this.ImagePaths =[];
    this.ImageURL =[];
    this.uplaodProgress = 0;
   // this.RecordId = this.projectfirebase.createId();
      this.checkandcreateDir();
  }

  checkandcreateDir(){
    this.MEDIA_FOLDER_NAME = this.ProjectId+Date.now();
    this.plt.ready().then(() => {
      let path = this.file.dataDirectory;

      this.file.checkDir(path, this.MEDIA_FOLDER_NAME).then(() => {
        this.loadFiles();
      }, err => {
        this.file.createDir(path, this.MEDIA_FOLDER_NAME, false).then(() => {
          this.loadFiles();
        })
      });
    })

  }

  loadFiles() {
    this.file.listDir(this.file.dataDirectory, this.MEDIA_FOLDER_NAME).then(res => {
      this.files = res;
      console.log('files: ', res);
      this.AllFiles.push(res);
      console.log('AllFiles',res);
    });
  }

  AddRecord(){

    if(this.BuildingNo == null || this.ApartmentNo == null || this.RoomNo == null || this.FloorNo == null || this.Note ==null){

      this.message.ShowToastMessage("Please Fill Details","danger");

    }else{
      let RecordDetails ={}
      var ADate = new Date();
      this.RecordId = this.projectfirebase.createId();
      RecordDetails['RecordId'] = this.RecordId;
      RecordDetails['ProjectId'] = this.ProjectId;
      RecordDetails['BuildingNo'] = this.BuildingNo;
      RecordDetails['FloorNo'] = this.FloorNo;
      RecordDetails['ApartmentNo'] =this.ApartmentNo;
      RecordDetails['RoomNo'] = this.RoomNo;
      RecordDetails['Note'] = this.Note;
      RecordDetails['date'] = ADate.toDateString();
      RecordDetails['createdAt'] = Date.now();
      
      let Allimagesdata={}

      Allimagesdata['RecordId'] = this.RecordId;
      Allimagesdata['ProjectId'] = this.ProjectId;
      Allimagesdata['Images'] = this.files;

  
      this.AllRecordData.push(RecordDetails);
      this.AllImagesData.push(Allimagesdata);
      console.log('All Record Data:',this.AllRecordData);
      console.log('All Record Images:',this.AllImagesData);
      console.log(this.AllRecordData.length);
      this.checkandcreateDir();
      this.EmptyFeilds();
    }
    
    
  }

  EmptyFeilds(){

    this.BuildingNo =null
     this.ApartmentNo =null
     this.RoomNo =null
     this.FloorNo =null
     this.Note =null

  }

  async selectMedia() {
    const actionSheet = await this.actionSheetController.create({
      header: 'What would you like to add?',
      buttons: [
        {
          text: 'Capture Image',
          handler: () => {
            this.captureImage();
          }
        },
        /*{
          text: 'Record Video',
          handler: () => {
            this.recordVideo();
          }
        },
        {
          text: 'Record Audio',
          handler: () => {
            this.recordAudio();
          }
        },*/
        {
          text: 'Upload Multiple Images',
          handler: () => {
            this.pickImages();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  pickImages() {
    this.imagePicker.getPictures({
      maximumImagesCount:2,
      quality:20
    }).then(results => {
      console.log('images: ', results);
      for (let result of results) {
        this.copyFileToLocalDir(result);
        
      }
    })
  }

  captureImage() {
    this.mediaCapture.captureImage().then((data: MediaFile[]) => {
      if(data.length > 0) {
        this.copyFileToLocalDir(data[0].fullPath);
      }
    });
  }

  copyFileToLocalDir(fullPath) {
    console.log('copy now: ', fullPath);
    let myPath = fullPath;
    // Make sure we copy from the right location
    if (fullPath.indexOf('file://') < 0) {
      myPath = 'file://' + fullPath;
    }

    const ext = myPath.split('.').pop();
    const d = Date.now();
    const newName = `${d}.${ext}`;
 
    const name = myPath.substr(myPath.lastIndexOf('/') + 1);
    const copyFrom = myPath.substr(0, myPath.lastIndexOf('/') + 1);
    const copyTo = this.file.dataDirectory + this.MEDIA_FOLDER_NAME;


    this.file.copyFile(copyFrom, name, copyTo, newName).then(() => {
      this.loadFiles();
    }, err => console.log('error: ', err))
  }

  openFile(f: FileEntry) {
    if (f.name.indexOf('.wav') > -1) {
      // We need to remove file:/// from the path for the audio plugin to work
      const path =  f.nativeURL.replace(/^file:\/\//, '');
      const audioFile: MediaObject = this.media.create(path);
      audioFile.play();
    } else if (f.name.indexOf('.MOV') > -1 || f.name.indexOf('.mp4') > -1) {
      // E.g: Use the Streaming Media plugin to play a video
      this.streamingMedia.playVideo(f.nativeURL);
    } else if (f.name.indexOf('.jpg') > -1) {
      // E.g: Use the Photoviewer to present an Image
      this.photoViewer.show(f.nativeURL, f.name);
    }
  }

  deleteFile(f: FileEntry) {
    const path = f.nativeURL.substr(0, f.nativeURL.lastIndexOf('/') + 1);
    
    this.file.removeFile(path, f.name).then(() => {
      this.loadFiles();
    }, err => console.log('error remove: ', err));
  }

  UpladAllImages(){
    console.log("Uplaod Files Check",this.files);
    
    //this.RecordId = this.projectfirebase.createId();
    for (let index = 0; index < this.files.length; index++) {
      //this.uploadFile(this.files[index]);
      //this.message.DismissLoadingMessage();

      this.uplaodProgress = this.uplaodProgress+(index/this.files.length*100);
    }
    

  }

  async uploadFile(f: FileEntry,ProjectId,RecordId,ImageNumber) {

    //this.message.LoadingMessage("Uplaoding Please Wait..","crescent");

    const path = f.nativeURL.substr(0, f.nativeURL.lastIndexOf('/') + 1); 
    const buffer = await this.file.readAsArrayBuffer(path,f.name); //f.name
    const type = this.getMimeType(f.name.split('.').pop());
    const fileBlob = new Blob([buffer], type);

    const randomId = Math.random()
      .toString(36)
      .substring(2, 8);

      const DataBasePath = `${ProjectId}/${RecordId}/${new Date().getTime()}_${randomId},`;
      const uploadTask = this.storage.upload(
        DataBasePath,
        fileBlob
      );

      uploadTask.then(async res => {
        this.ImagePaths.push(DataBasePath);
        this.ImageURL.push(await res.ref.getDownloadURL());
        let Image={}

        Image['ImageUrl'+ImageNumber] = await res.ref.getDownloadURL();
        Image['ImagePath'+ImageNumber] = DataBasePath;

      setTimeout(() => {
        this.ProjectService.UpdateImageRecordDetails(ProjectId,RecordId,Image);
        this.uplaodProgress += 1;
      }, 5000);
        
      }).catch(async error=>{
        this.message.ShowToastMessage("Have Problem With File Please Try Again !","danger");
        console.log(await error);
        
      });

      this.message.DismissLoadingMessage();
  }

  getMimeType(fileExt) {
    if (fileExt == 'wav') return { type: 'audio/wav' };
    else if (fileExt == 'jpg') return { type: 'image/jpg' };
    else if (fileExt == 'mp4') return { type: 'video/mp4' };
    else if (fileExt == 'MOV') return { type: 'video/quicktime' };
  }


  InsertRecord(){

    
    for (let index = 0; index < this.AllRecordData.length; index++) {
        this.ProjectService.InsetProjectRecord(this.AllRecordData[index].ProjectId,this.AllRecordData[index].RecordId,this.AllRecordData[index]);
    }
    
    for (let index = 0; index < this.AllImagesData.length; index++) {
      
      
        for (let index2 = 0; index2 < this.AllImagesData[index].Images.length; index2++) {
       
            this.uploadFile(this.AllImagesData[index].Images[index2],this.AllImagesData[index].ProjectId,this.AllImagesData[index].RecordId,index2);
           
            
        }
     
        
    }

    //this.BackButton();
  }

  BackButton(){
    this.location.back();
    }
  
 
}
