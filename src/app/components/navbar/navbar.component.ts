import { Component, Input, OnInit } from '@angular/core';
import { KeycloakService } from '../../services/keycloak/keycloak.service';
import { Router } from '@angular/router';
import { Profile } from '../../services/api/models/profile';

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
    private router: Router
  ) { }

  ngOnInit(): void {
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

  manageAccount(){
    this.keycloakService.manageAccount();
  }
}
