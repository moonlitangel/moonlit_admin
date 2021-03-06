import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Store } from './store';
import { Nick } from './nick';
import { Menu } from './menu';

@Injectable()
export class StoreService {
	private headers = new Headers({ 'Content-Type': 'application/json' });
	private StoreUrl = 'http://52.175.147.246:3002/api/stores';
	private NickUrl = 'http://52.175.147.246:3002/api/users/nick';
	private MenuUrl = 'http://52.175.147.246:3002/api/menu'
	constructor(private http: Http) { }

	getAllStore(): Promise<Store[]> {
		return this.http.get(this.StoreUrl, { headers: this.headers })
			.toPromise()
			.then(response => response.json() as Store[])
			.catch(this.handleError);
	}

	getUserNick(): Promise<Nick[]> {
		return this.http.get(this.NickUrl, { headers: this.headers })
			.toPromise()
			.then(response => response.json() as Nick[])
			.catch(this.handleError);
	}

	getStore(id: number): Promise<Store> {
		const url = `${this.StoreUrl}/detail/${id}`;
		return this.http.get(url, { headers: this.headers })
			.toPromise()
			.then(response => response.json() as Store)
			.catch(this.handleError);
	}

	createStore(Store: Store): Promise<void> {
		const url = `${this.StoreUrl}/create`;
		return this.http.post(url, Store, { headers: this.headers })
			.toPromise()
			.then(res => {
				console.log(res);
				res.json()
			})
			.catch(this.handleError);
	}

	updateStore(Store: Store): Promise<void> {
		const url = `${this.StoreUrl}/update`;
		return this.http.put(url, JSON.stringify(Store), { headers: this.headers })
			.toPromise()
			.then(res => {
				console.log(res);
				res.json() as Store
			})
			.catch(this.handleError);
	}
	
	deleteStore(id: number): Promise<void> {
		const url = `${this.StoreUrl}/destroy/${id}`;
		return this.http.delete(url, { headers: this.headers })
			.toPromise()
			.then(() => null)
			.catch(this.handleError);
	}

	getStoreMenu(id: number): Promise<Menu[]> {
		const url = `${this.MenuUrl}/${id}`;
		return this.http.get(url, { headers: this.headers })
			.toPromise()
			.then(response => response.json() as Menu[])
			.catch(this.handleError);
	}

	createMenu(Menu: Menu): Promise<void> {
		const url = `${this.MenuUrl}/create/${Menu.storeId}`;
		return this.http.post(url, Menu, { headers: this.headers })
			.toPromise()
			.then(res => res.json().data)
			.catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
}
