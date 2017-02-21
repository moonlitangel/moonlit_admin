import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from './store';
import { StoreService } from './store.service';

@Component({
  selector: 'app-store-new',
  templateUrl: './store-new.component.html'
})
export class StoreNewComponent implements OnInit {
  model = new Store;

  constructor(
    private StoreService: StoreService,
    private router: Router
    ) { }

  add(model): void {
		this.StoreService.createStore(this.model)
			.then(() => {
				this.router.navigate(['/store/list']);
			})
	}

  ngOnInit() {
  }

}
