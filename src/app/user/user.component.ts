import { Component, OnInit } from '@angular/core';

import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  results: User[];
  constructor(private UserService: UserService) { }

  getAllUser(): void {
    this.UserService.getAllUser()
      .then(results => {
        this.results = results;
      })
  }

  ngOnInit() {
    this.getAllUser();
  }

}
