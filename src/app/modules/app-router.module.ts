import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../components/home/home.component';
import { AboutComponent } from '../components/about/about.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { AdvancedGameComponent } from '../components/advanced-game/advanced-game.component';

const appRoutes: Routes = [
  { path: 'about', component: AboutComponent}, 
  { path: 'advanced-game', component: AdvancedGameComponent },
  { path: '', component: HomeComponent }, 
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [], 
  exports: [
    RouterModule
  ]
})
export class AppRouterModule { }
