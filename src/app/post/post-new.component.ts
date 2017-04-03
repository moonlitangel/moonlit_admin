import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Post } from './post';
import { PostService } from './post.service';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html'
})
export class PostNewComponent implements OnInit {
  model = new Post;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private PostService: PostService) { 
    }

  add() {
    this.PostService.createPost(this.model)
      .then(() => this.router.navigate(['/post/list']));
  }

  ngOnInit() {
    
  }

}
