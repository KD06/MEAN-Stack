import { Post } from "./post.model";
import { Subject } from "rxjs";

export class PostService{

    private posts: Post[] = [];
    private postsUpdate = new Subject<Post[]>();

    getPosts(){
        return [...this.posts];
    }
    getPostUpdateListner(){
        return this.postsUpdate.asObservable();
    }
    savePosts(title: string, content: string){
        const post = {title: title, content: content}
        this.posts.push(post);
        this.postsUpdate.next([...this.posts])
    }

}