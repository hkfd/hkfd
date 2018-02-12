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
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class RoutingModule {}
