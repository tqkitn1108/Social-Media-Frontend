import { Component, Input, OnInit } from '@angular/core';
import { KeycloakService } from '../../services/keycloak/keycloak.service';
import { Router } from '@angular/router';
import { Profile } from '../../services/api/models/profile';
import { UserService } from '../../services/api/users/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  user: Profile = JSON.parse(localStorage.getItem('user') as string);
  showMenu: boolean = false;

  constructor(
    private keycloakService: KeycloakService,
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loadUser();
    const navLinks = document.querySelectorAll('.nav-link');
    const divElement = document.createElement('div');
    divElement.className = 'mt-1.5 border-b-4 border-b-blue-400 rounded-md w-full';

    navLinks.forEach(link => {
      if (window.location.href.endsWith(link.getAttribute('href') || '')) {
        link.classList.add('text-[#1A73E3]');
        link.appendChild(divElement);
      }
      link.addEventListener('click', () => {
        navLinks.forEach(l => {
          l.classList.remove('text-[#1A73E3]');
          if (l.lastElementChild === divElement) {
            l.lastElementChild?.remove();
          }
        });
        link.classList.add('text-[#1A73E3]');
        link.appendChild(divElement);
      });
    });
  }

  onSearch(event: any) {
    if (!event.target.value) return;
    const queryParams = {
      query: event.target.value
    }
    event.target.value = '';
    this.router.navigate(['/search'], { queryParams })
  }


  async logout() {
    localStorage.removeItem('user');
    this.keycloakService.logout();
  }

  manageAccount() {
    this.keycloakService.manageAccount();
  }

  loadUser() {
    if (!this.isMatchedLocalStorage()) {
      this.userService.getCurrentUser()
        .subscribe({
          next: data => {
            this.user = data;
            if (this.user.avatarUrl === null) {
              this.user.avatarUrl = 'https://res.cloudinary.com/dxwdkeign/image/upload/v1718177786/qy79yhrfgenypywfaznb.jpg';
              this.userService.setAvatarUrl('https://res.cloudinary.com/dxwdkeign/image/upload/v1718177786/qy79yhrfgenypywfaznb.jpg').subscribe({
                error: err => {
                  console.log(err);
                }
              });
            }
            localStorage.setItem('user', JSON.stringify(this.user));
          },
          error: error => {
            console.log(error);
          }
        })
    }
  }

  isMatchedLocalStorage() {
    if (localStorage.getItem('user')) {
      const userId = JSON.parse(localStorage.getItem('user') as string).id;
      if (userId === this.keycloakService.profile?.id) return true;
      localStorage.removeItem('user');
    }
    return false;
  }
}
