import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { UserService } from "../api/users/user.service";
import { map } from 'rxjs/operators';
import { KeycloakService } from "../keycloak/keycloak.service";

export const userGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  const keycloakService = inject(KeycloakService);
  const router = inject(Router);

  if (localStorage.getItem('user')) {
    const userId = JSON.parse(localStorage.getItem('user') as string).id;
    if (userId === keycloakService.profile?.id) return true;
    localStorage.removeItem('user');
  }

  return userService.getCurrentUser().pipe(
    map(user => {
      if (user) {
        console.log(user);
        if (user.avatarUrl === null) {
          user.avatarUrl = 'https://res.cloudinary.com/dxwdkeign/image/upload/v1718177786/qy79yhrfgenypywfaznb.jpg';
          userService.setAvatarUrl('https://res.cloudinary.com/dxwdkeign/image/upload/v1718177786/qy79yhrfgenypywfaznb.jpg').subscribe({
            error: err => {
              console.log(err);
              return false;
            }
          });
        }
        localStorage.setItem('user', JSON.stringify(user));
        return true;
      } else {
        router.navigate(['/error']);
        return false;
      }
    })
  );
};
