import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '',redirectTo: 'login',pathMatch: 'full'},
  {path: 'home',loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {path: 'login',loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)},
  {path: 'splash-page',loadChildren: () => import('./splash-page/splash-page.module').then( m => m.SplashPagePageModule)},
  {path: 'pendingprojects',loadChildren: () => import('./pendingprojects/pendingprojects.module').then( m => m.PendingprojectsPageModule)},
  {path: 'completedprojects',loadChildren: () => import('./completedprojects/completedprojects.module').then( m => m.CompletedprojectsPageModule)},
  {path: 'createproject',loadChildren: () => import('./createproject/createproject.module').then( m => m.CreateprojectPageModule)},
  {path: 'projectdetail/:docid',loadChildren: () => import('./projectdetail/projectdetail.module').then( m => m.ProjectdetailPageModule)},
  {path: 'newrecord/:projectid',loadChildren: () => import('./newrecord/newrecord.module').then( m => m.NewrecordPageModule)},
  {path: 'recorddetails/:Pid/:Rid',loadChildren: () => import('./recorddetails/recorddetails.module').then( m => m.RecorddetailsPageModule)},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
