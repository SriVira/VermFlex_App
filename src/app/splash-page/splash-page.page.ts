import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash-page',
  templateUrl: './splash-page.page.html',
  styleUrls: ['./splash-page.page.scss'],
})
export class SplashPagePage implements OnInit {

  constructor( public router:Router) { 

    setTimeout(()=>{
      this.router.navigateByUrl('/login');
    },3000)
  }

  ngOnInit() {
  }

}
