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

  deleteStore(Store: Store): void {
		this.StoreService.deleteStore(Store.id)
			.then(() => {
				this.results = this.results.filter(h => h !== Store);
			})
	}

  confirmDelete(Store: Store) :void {
		var r = confirm("삭제하시겠습니까?");
		if(r === true) {
			this.deleteStore(Store);
			console.log("삭제", Store);
		} else {
			console.log("취소");
		}
	}

  ngOnInit() {
    this.getAllStore();
  }

}
