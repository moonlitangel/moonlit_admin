import { Component, OnInit } from '@angular/core';

import { Store } from './store';
import { StoreService } from './store.service';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html'
})
export class StoreListComponent implements OnInit {
  results: Store[];
  model = new Store;

  constructor(private StoreService: StoreService) { }

  getAllStore(): void {
    this.StoreService.getAllStore()
      .then(results => {
        this.results = results;
      })
  }

  ngOnInit() {
    this.getAllStore();
  }

}
