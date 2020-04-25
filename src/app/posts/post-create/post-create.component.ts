import { Component, OnInit, OnDestroy} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { PostService } from '../post.service';
import { Post } from '../post.model';
import { mimeType } from './mime-type.validator';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit, OnDestroy{

  constructor(public postService: PostService, public authService: AuthService, public route: ActivatedRoute) { }
  
  enteredTitle = '';
  enteredContent = '';
  private mode = '';
  private postId = '';
  public post: Post;
  imagePreview: string;
  loading = false;
  form: FormGroup;
  private authStatusSub = new Subscription;

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListner()
    .subscribe(authStatus => {
      this.loading = false;
    })
    this.form = new FormGroup({
      'title': new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]}),
      'content': new FormControl(null, {
        validators: [Validators.required]}),
      'image': new FormControl(null, {
          validators: [Validators.required],
          asyncValidators: [mimeType]})
    })
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('postId')){
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.loading = true;
        this.postService.getPost(this.postId).subscribe(
          postData => {
            this.loading = false;
            this.post = { id: postData._id, title: postData.title, content: postData.content, imagePath: "", creator: postData.creator};
            this.form.setValue({
              'title': this.post.title,
              'content': this.post.content,
              'image': this.post.imagePath
            })
          });
      } else{
        this.mode = 'create';
        this.postId =null;
      }
    })
  }

  onImagePicked(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = (reader.result as string);
    }
    reader.readAsDataURL(file);
  }

  onSavePost(){
    if(this.form.invalid){
      return;
    }

    if(this.mode === "create"){
      this.postService.savePosts(this.form.value.title, this.form.value.content, this.form.value.image);
    } else {
      this.postService.updatePost(this.postId, this.form.value.title, this.form.value.content, this.form.value.image);
    }
    // this.form.reset();
  }

  ngOnDestroy(){
    this.authStatusSub.unsubscribe();
  }
}
