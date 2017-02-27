import { Component, Input, OnChanges } from '@angular/core';

import { Menu } from './menu';
import { StoreService } from './store.service';

@Component({
  selector: 'app-store-menu',
  templateUrl: './store-menu.component.html'
})
export class StoreMenuComponent implements OnChanges {
  results: Menu[];
  model = new Menu;
  tempModel = new Menu;
  @Input() store: number;

  constructor(private StoreService: StoreService) { }

  getMenu(id: number): void {
    this.StoreService.getStoreMenu(id)
      .then(results => {
        this.results = results;
      })
  }

  add() {
    this.StoreService.createMenu(this.model)
      .then(() => {
        this.tempModel = this.model;
        this.model = new Menu;
        this.model.storeId = this.store;
        this.results.push(this.tempModel);
        console.log(this.tempModel, this.model);
      });
  }

  ngOnChanges() {
    this.model.storeId = this.store;
    this.getMenu(this.store);
  }

}
