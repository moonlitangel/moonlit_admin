import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Post } from './post';

@Injectable()
export class PostService {
	private headers = new Headers({ 'Content-Type': 'application/json' });
	private PostUrl = 'http://52.175.147.246:3005/api/posts';
	constructor(private http: Http) { }

	getPosts(): Promise<Post[]> {
		return this.http.get(this.PostUrl, { headers: this.headers })
			.toPromise()
			.then(response => response.json() as Post[])
			.catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
}
