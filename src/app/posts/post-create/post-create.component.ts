import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { PostService } from '../post.service';
import { Post } from '../post.model';



@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit{

  constructor(public postService: PostService, public route: ActivatedRoute) { }
  
  enteredTitle = '';
  enteredContent = '';
  private mode = '';
  private postId = '';
  public post: Post;
  loading = false;

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('postId')){
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.loading = true;
        this.postService.getPost(this.postId).subscribe(
          postData => {
            this.loading = false;
            this.post = { id: postData._id, title: postData.title, content: postData.content};
          }
        );
      } else{
        this.mode = 'create';
        this.postId =null;
      }
    })
  }

  onAddPost(form: NgForm){
    if(form.invalid){
      return;
    }

    if(this.mode === "create"){
      this.postService.savePosts(form.value.title, form.value.content);
    } else {
      this.postService.updatePost(this.postId, form.value.title, form.value.content);
    }
    form.resetForm();
  }
}
