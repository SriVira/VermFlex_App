import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateprojectPage } from './createproject.page';

const routes: Routes = [
  {
    path: '',
    component: CreateprojectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateprojectPageRoutingModule {}
