import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecorddetailsPageRoutingModule } from './recorddetails-routing.module';

import { RecorddetailsPage } from './recorddetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecorddetailsPageRoutingModule
  ],
  declarations: [RecorddetailsPage]
})
export class RecorddetailsPageModule {}
