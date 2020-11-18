import { Component, OnInit } from '@angular/core';
import {ToastserviceService} from'../services/toastservice.service'
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public afauth:AngularFireAuth ,private meesage :ToastserviceService, private router : Router,private Istoreage :Storage) { }
  IsLogin:any;
  ngOnInit() {

  }

  async login(Email,Password){

    await this.afauth.signInWithEmailAndPassword(Email,Password).then(res=>{
    
      this.meesage.ShowToastMessage("Login Sucess","success");
      this.router.navigateByUrl('/home');
      this.Istoreage.set("IsLogin","true");
      localStorage.setItem("LogEmail",Email)
      
    }).catch(err=>{

        this.meesage.ShowToastMessage("Invalid Login Details","danger");
    })


  }


  

}
