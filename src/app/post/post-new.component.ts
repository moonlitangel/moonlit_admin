import { Component, OnInit } from '@angular/core';

import { Post } from './post';
import { PostService } from './post.service';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html'
})
export class PostNewComponent implements OnInit {
  model: Post[];

  constructor(private PostService: PostService) { }

  

  ngOnInit() {
    this.PostService.getPosts().then((results) => this.model = results);
  }

}
