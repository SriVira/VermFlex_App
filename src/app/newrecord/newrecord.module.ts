import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewrecordPageRoutingModule } from './newrecord-routing.module';

import { NewrecordPage } from './newrecord.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewrecordPageRoutingModule
  ],
  declarations: [NewrecordPage]
})
export class NewrecordPageModule {}
