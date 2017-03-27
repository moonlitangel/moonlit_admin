import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Store } from './store';
import { Nick } from './nick';
import { Menu } from './menu';

@Injectable()
export class StoreService {
	private headers = new Headers({ 'Content-Type': 'application/json' });
	private StoreUrl = 'http://52.175.147.246:3005/api/stores';
	private NickUrl = 'http://52.175.147.246:3005/api/users/nick';
	private MenuUrl = 'http://52.175.147.246:3005/api/menu'
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

	createStore(Store: Store): Promise<any> {
		const url = `${this.StoreUrl}/create`;
		return this.http.post(url, Store, { headers: this.headers })
			.toPromise()
			.then(res => res.json())
			.catch(this.handleError);
	}

	createImage(store: number, img: string): Promise<void> {
		const url = `${this.StoreUrl}/createimg`;
		return this.http.post(url, { storeId: store, img: img }, { headers: this.headers })
			.toPromise()
			.then(res => {
				console.log(res);
				res.json()
			})
			.catch(this.handleError);
	}

	createTag(store: number, tag: string): Promise<void> {
		const url = `${this.StoreUrl}/createtag`;
		return this.http.post(url, { storeId: store, name: tag }, { headers: this.headers })
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

	updateImage(id: number, img: string): Promise<void> {
		const url = `${this.StoreUrl}/updateimg`;
		return this.http.put(url, JSON.stringify({id: id, img: img}), { headers: this.headers })
			.toPromise()
			.then(res => {
				console.log(res);
				res.json()
			})
			.catch(this.handleError);
	}

	deleteImage(id: number): Promise<void> {
		const url = `${this.StoreUrl}/deleteimg/${id}`;
		return this.http.delete(url, { headers: this.headers })
			.toPromise()
			.then(() => null)
			.catch(this.handleError);
	}

	deleteTag(id: number): Promise<void> {
		const url = `${this.StoreUrl}/deletetag/${id}`;
		return this.http.delete(url, { headers: this.headers })
			.toPromise()
			.then(() => null)
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
