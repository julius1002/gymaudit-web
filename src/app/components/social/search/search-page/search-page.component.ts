import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialService } from 'src/app/services/social.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  users: []

  updateResult(users) {
    this.users = users.content;
  }

  pageSize: number = 10

  constructor(public socialService: SocialService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  showUserProfile(user) {
    this.router.navigate(["/profile/" + user.username])
  }
}
