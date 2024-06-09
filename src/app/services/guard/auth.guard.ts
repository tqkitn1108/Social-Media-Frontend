import { inject } from "@angular/core";
import { KeycloakService } from "../keycloak/keycloak.service";
import { CanActivateFn, Router } from "@angular/router";

export const authGuard: CanActivateFn = () => {
  const keycloakService = inject(KeycloakService);
  const router = inject(Router);
  if (keycloakService.keycloak?.isTokenExpired()) {
    router.navigate(['login']);
    return false;
  }
  return true;
};