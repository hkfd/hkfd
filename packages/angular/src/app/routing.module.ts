import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'about',
    loadChildren: 'app/pages/about/about.module#AboutModule',
    data: {
      state: 'about'
    }
  },
  {
    path: 'work',
    loadChildren: 'app/pages/work/work.module#WorkModule',
    data: {
      state: 'work'
    }
  },
  {
    path: 'careers',
    loadChildren: 'app/pages/careers/careers.module#CareersModule',
    data: {
      state: 'careers'
    }
  },
  {
    path: 'contact',
    loadChildren: 'app/pages/contact/contact.module#ContactModule',
    data: {
      state: 'contact'
    }
  },
  {
    path: 'news',
    loadChildren: 'app/pages/news/news.module#NewsModule',
    data: {
      state: 'news'
    }
  },
  {
    path: '',
    loadChildren: 'app/pages/home/home.module#HomeModule',
    data: {
      state: 'home'
    }
  },
  {
    path: '',
    loadChildren: 'app/shared/post/post.module#PostModule',
    data: {
      state: 'post'
    }
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule],
  declarations: []
})
export class RoutingModule {}
