import { Component, OnInit } from '@angular/core';

import { Store } from './store';
import { StoreService } from './store.service';

@Component({
  selector: 'app-store-new',
  templateUrl: './store-new.component.html'
})
export class StoreNewComponent implements OnInit {
  model = new Store;

  constructor(private StoreService: StoreService) { }

  ngOnInit() {
  }

}
