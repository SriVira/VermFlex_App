import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewrecordPage } from './newrecord.page';

const routes: Routes = [
  {
    path: '',
    component: NewrecordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewrecordPageRoutingModule {}
