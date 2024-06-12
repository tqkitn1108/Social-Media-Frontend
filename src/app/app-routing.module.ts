import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FriendsPageComponent } from './pages/friends-page/friends-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'profile/me',
    component: ProfileComponent
  },
  {
    path: 'profile/:userId',
    component: ProfileComponent
  },
  {
    path: 'friends',
    component: FriendsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
