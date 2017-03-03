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

  onChange(value) {
    console.log(value);
    this.model.storeId = value;
  }

  updateAuth(user) {
    this.model.id = user.id;
    this.model.auth = '가맹';
    this.state = user.id;
    this.model.storeId = user.storeId;
  }
  closeAuth(user) {
    console.log(this.model);
    this.state = 'init';
    this.model = new User;
  }

  update(): void {
    this.UserService.updateAuthUser(this.model)
      .then(() => {
        this.closeAuth(this.model);
        this.getAllUser();
      })
  }

  ngOnInit() {
    this.getAllUser();
    this.getSimpleStore();
  }

}
