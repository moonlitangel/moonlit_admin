import { Component, OnInit } from '@angular/core';

import { User } from './user';
import { SimpleStore } from './simplestore';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  results: User[];
  stores: SimpleStore[];
  model = new User;
  state: string = 'init';

  constructor(private UserService: UserService) { }

  getAllUser(): void {
    this.UserService.getAllUser()
      .then(results => {
        this.results = results;
      });
  };

  getSimpleStore(): void {
    this.UserService.getSimpleStore()
      .then(results => {
        this.stores = results;
        
      });
  };

  ngOnInit() {
    this.getAllUser();
    this.getSimpleStore();
  }

}
