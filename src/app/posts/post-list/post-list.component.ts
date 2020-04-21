import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  loading: boolean = false;
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1,2,5,10];
  private postSub: Subscription;

  constructor(public postService: PostService){}

  ngOnInit() {
    this.postService.getPosts(this.postsPerPage, this.currentPage);
    this.loading = true;
    this.postSub = this.postService
      .getPostUpdateListner()
      .subscribe((postData: {posts: Post[], postCount: number}) =>{
        this.loading = false;
        this.posts = postData.posts;
        this.totalPosts = postData.postCount;
    })
  }

  onChangedPage(pageData: PageEvent){
    this.loading = true;
    this.currentPage = pageData.pageIndex+1;
    this.postsPerPage = pageData.pageSize;
    this.postService.getPosts(this.postsPerPage, this.currentPage);
  }

  onDelete(postId: string){
    this.postService.deletePost(postId).subscribe(() => {
      this.postService.getPosts(this.postsPerPage, this.currentPage);
    });
  }

  ngOnDestroy(){
    this.postSub.unsubscribe();
  }

}
