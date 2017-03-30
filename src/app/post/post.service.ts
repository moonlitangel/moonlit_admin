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

	getPost(id: number): Promise<Post> {
		const url = `${this.PostUrl}/${id}`;
		return this.http.get(url, {headers: this.headers})
			.toPromise()
			.then(response => response.json() as Post)
			.catch(this.handleError);
	}

	updatePost(Post: Post): Promise<void> {
		const url = `${this.PostUrl}/update`;
		return this.http.put(url, JSON.stringify(Post), {headers: this.headers})
			.toPromise()
			.then(res => res.json())
			.catch(this.handleError);
	}

	createPost(Post: Post): Promise<void> {
		return this.http.post(this.PostUrl, Post, { headers: this.headers })
			.toPromise()
			.then(res => {
				console.log(res);
				res.json()
			})
			.catch(this.handleError);
	}

	deletePost(id: number): Promise<void> {
		const url = `${this.PostUrl}/delete/${id}`;
		return this.http.delete(url, { headers: this.headers })
			.toPromise()
			.then(() => null)
			.catch(this.handleError);
	}
	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
}
