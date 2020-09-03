import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';



const routes: Routes = [
  {
  path: '',
  component: AppComponent,
  children: [
              {
                path: '',
                redirectTo: 'auth',
                pathMatch: 'full',
              },
              {
                path: 'auth',
                loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
              },
              {
                path: 'admin',
                loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
              },
              {
                path: '404',
                component: NotFoundComponent
              },
              // {
              //   path: 'account',
              //   loadChildren: () => import('./theme/account/account.module').then(m => m.AccountModule)
              // },
              // {
              //   path: 'assignment',
              //   loadChildren: () => import('./theme/assignment/assignment.module').then(m => m.AssignmentModule)
              // },
              // {
              //   path: 'learning',
              //   loadChildren: () => import('./theme/learning/learning.module').then(m => m.LearningModule)
              // }
            ]
 },
 {
  path: '**',
  redirectTo: '404',
  pathMatch: 'full'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
