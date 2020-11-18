import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompletedprojectsPageRoutingModule } from './completedprojects-routing.module';

import { CompletedprojectsPage } from './completedprojects.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompletedprojectsPageRoutingModule
  ],
  declarations: [CompletedprojectsPage]
})
export class CompletedprojectsPageModule {}
