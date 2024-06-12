import { Component, OnInit } from '@angular/core';
import { Profile } from '../../services/api/models/profile';
import { UserService } from '../../services/api/users/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent implements OnInit {
  user: Profile = JSON.parse(localStorage.getItem('user') as string);

  query: string = '';
  users: Profile[] = [];

  constructor(private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.query = this.activatedRoute.snapshot.queryParams['query'];
    this.userService.searchUser(this.query)
      .subscribe({
        next: data => {
          this.users = data;
          console.log(data);
          
        },
        error: err => {
          console.log(err);
        }
      })
  }
}
