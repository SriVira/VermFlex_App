import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PendingprojectsPage } from './pendingprojects.page';

const routes: Routes = [
  {
    path: '',
    component: PendingprojectsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PendingprojectsPageRoutingModule {}
