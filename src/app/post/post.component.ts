import { Component, OnInit } from '@angular/core';

import { Post } from './post';
import { PostService } from './post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html'
})
export class PostComponent implements OnInit {
  results: Post[];
  getData: any;
  model = new Post;

  constructor(private PostService: PostService) { }

  getPost(id: number) {
    this.getData = id;
    this.PostService.getPost(id)
      .then((result) => {
        this.model = result;
      })
  }

  updatePost(Post: Post): void {
		this.PostService
			.updatePost(this.model)
			.then(() => {
				this.getData = '';
				this.PostService.getPosts().then((results) => this.results = results);
			})
	}

  deletePost(Post: Post) {
    this.PostService.deletePost(Post.id)
      .then(() => this.results = this.results.filter(h => h !== Post))
  }

  confirmDelete(Post: Post) :void {
		var r = confirm("삭제하시겠습니까?");
		if(r === true) {
			this.deletePost(Post);
			console.log("삭제", Post);
		} else {
			console.log("취소");
		}
	}
  

  ngOnInit() {
    this.PostService.getPosts().then((results) => this.results = results);
  }

}
