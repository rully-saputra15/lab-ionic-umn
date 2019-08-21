import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'resep', pathMatch: 'full' },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
  { path: 'resep', 
      children:[
        {
          path:'',
          loadChildren:'./resep/resep.module#ResepPageModule'
        },
        {
          path:'detail',
          loadChildren:'./resep/detail/detail.module#DetailPageModule'
        },
        {
          path:'edit',
          loadChildren:'./resep/edit/edit.module#EditPageModule'
        },
      ]},
  { path: 'users', loadChildren: './users/users.module#UsersPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
