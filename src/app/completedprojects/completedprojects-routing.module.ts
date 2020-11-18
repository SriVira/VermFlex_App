import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompletedprojectsPage } from './completedprojects.page';

const routes: Routes = [
  {
    path: '',
    component: CompletedprojectsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompletedprojectsPageRoutingModule {}
