import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  private postSub: Subscription;
  loading: boolean = false;

  constructor(public postService: PostService){}

  ngOnInit() {
    this.postService.getPosts();
    this.loading = true;
    this.postSub = this.postService.getPostUpdateListner().subscribe((posts: Post[]) =>{
      this.loading = false;
      this.posts = posts;
    })
  }

  onDelete(postId: string){
    this.postService.deletePost(postId);
  }

  ngOnDestroy(){
    this.postSub.unsubscribe();
  }

}
