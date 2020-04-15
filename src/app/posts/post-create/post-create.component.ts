import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent{

  constructor(public postService: PostService) { }

  ngOnInit() {
  }
  
  enteredTitle = '';
  enteredContent = "";
  onAddPost(form: NgForm){
    if(form.invalid){
      return;
    }

    this.postService.savePosts(form.value.title, form.value.content);
    form.resetForm();
  }
}
