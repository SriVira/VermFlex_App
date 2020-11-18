import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PendingprojectsPageRoutingModule } from './pendingprojects-routing.module';

import { PendingprojectsPage } from './pendingprojects.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PendingprojectsPageRoutingModule
  ],
  declarations: [PendingprojectsPage]
})
export class PendingprojectsPageModule {}
