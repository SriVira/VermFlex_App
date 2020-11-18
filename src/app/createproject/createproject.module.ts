import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateprojectPageRoutingModule } from './createproject-routing.module';

import { CreateprojectPage } from './createproject.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateprojectPageRoutingModule,
 
    
  ],
  declarations: [CreateprojectPage]
})
export class CreateprojectPageModule {}
