import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: 'app/pages/home/home.module#HomeModule'
  },
  {
    path: 'about',
    loadChildren: 'app/pages/about/about.module#AboutModule'
  },
  {
    path: 'work',
    loadChildren: 'app/pages/work/work.module#WorkModule'
  },
  {
    path: 'careers',
    loadChildren: 'app/pages/careers/careers.module#CareersModule'
  },
  {
    path: ':type/:id',
    loadChildren: 'app/shared/post/post.module#PostModule'
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class RoutingModule {}
