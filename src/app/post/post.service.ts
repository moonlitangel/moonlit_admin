import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PostService {
	private headers = new Headers({ 'Content-Type': 'application/json' });
	private UserUrl = 'http://52.175.147.246:3005/api/users';
	constructor(private http: Http) { }
	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
}
