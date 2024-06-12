import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeycloakService } from './services/keycloak/keycloak.service';
import { LoginComponent } from './pages/login/login.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HttpTokenInterceptor } from './services/interceptor/http-token.interceptor';
import { PostComponent } from './components/post/post.component';
import { CreatePostBoxComponent } from './components/create-post-box/create-post-box.component';
import { CropperModalComponent } from './components/cropper-modal/cropper-modal.component';
import { ImageCropperModule } from "ngx-image-cropper";
import { CreatePostOverlayComponent } from './components/create-post-overlay/create-post-overlay.component';
import { PostOverlayComponent } from './components/post-overlay/post-overlay.component';
import { CommentComponent } from './components/comment/comment.component';
import { FormsModule } from '@angular/forms';
import { MediaDisplayComponent } from './components/media-display/media-display.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { FriendCardComponent } from './components/friend-card/friend-card.component';
import { FriendsPageComponent } from './pages/friends-page/friends-page.component';
import { SearchItemComponent } from './components/search-item/search-item.component';
import { FriendsAllComponent } from './components/friends-all/friends-all.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';

export function kcFactory(kcService: KeycloakService) {
  return () => kcService.init();
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    ProfileComponent,
    PostComponent,
    CreatePostBoxComponent,
    CropperModalComponent,
    CreatePostOverlayComponent,
    PostOverlayComponent,
    CommentComponent,
    MediaDisplayComponent,
    LoadingSpinnerComponent,
    FriendCardComponent,
    FriendsPageComponent,
    SearchItemComponent,
    FriendsAllComponent,
    SearchPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ImageCropperModule,
    FormsModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: APP_INITIALIZER,
      deps: [KeycloakService],
      useFactory: kcFactory,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
