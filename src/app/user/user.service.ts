import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { User } from './user';

@Injectable()
export class UserService {
	private headers = new Headers({ 'Content-Type': 'application/json' });
	private UserUrl = 'http://52.175.147.246:3002/api/users';
	constructor(private http: Http) { }

	getAllUser(): Promise<User[]> {
		return this.http.get(this.UserUrl, { headers: this.headers })
			.toPromise()
			.then(response => response.json() as User[])
			.catch(this.handleError);
	}

	// updateStore(Store: Store): Promise<void> {
	// 	const url = `${this.StoreUrl}/update`;
	// 	return this.http.put(url, JSON.stringify(Store), { headers: this.headers })
	// 		.toPromise()
	// 		.then(res => {
	// 			console.log(res);
	// 			res.json() as Store
	// 		})
	// 		.catch(this.handleError);
	// }
	
	// deleteStore(id: number): Promise<void> {
	// 	const url = `${this.StoreUrl}/destroy/${id}`;
	// 	return this.http.delete(url, { headers: this.headers })
	// 		.toPromise()
	// 		.then(() => null)
	// 		.catch(this.handleError);
	// }


	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
}
