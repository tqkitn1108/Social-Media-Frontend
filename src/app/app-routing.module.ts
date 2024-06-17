import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FriendsPageComponent } from './pages/friends-page/friends-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { userGuard } from './services/guard/user.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [userGuard]
  },
  {
    path: 'profile/me',
    component: ProfileComponent,
    canActivate: [userGuard]
  },
  {
    path: 'profile/:userId',
    component: ProfileComponent,
    canActivate: [userGuard]
  },
  {
    path: 'friends',
    component: FriendsPageComponent,
    canActivate: [userGuard]
  },
  {
    path: 'search',
    component: SearchPageComponent,
    canActivate: [userGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
