import { Post } from "./post.model";
import { Subject } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

export class PostService{

    private posts: Post[] = [];
    private postsUpdate = new Subject<Post[]>();

    constructor(private http: HttpClient, private router: Router){}

    getPosts(){
        this.http.get<{message: string, posts: any}>("http://localhost:3000/api/posts").
        pipe(map((postData)=>{
            return postData.posts.map(post => {
                return {
                    title : post.title,
                    content: post.content,
                    id: post._id
                }
            })
        })).subscribe(
            (transformedPosts) => { this.posts = transformedPosts
                this.postsUpdate.next([...this.posts])},
            (error) => console.log(error)
        )
    }

    getPostUpdateListner(){
        return this.postsUpdate.asObservable();
    }

    getPost(id: string){
        // return {...this.posts.find(p => p.id === id)};
        return this.http.get<{_id: string, title: string, content: string}>("http://localhost:3000/api/posts/"+id)
    }

    savePosts(title: string, content: string){
        const post = {id: null, title: title, content: content};
        this.http.post<{message: string, postId: string}>("http://localhost:3000/api/posts", post).subscribe(
            response => {
                post.id = response.postId;
                this.posts.push(post);
                this.postsUpdate.next([...this.posts]);
                this.router.navigate(["/"]);
            }
        )
    }

    updatePost(id: string, title: string, content: string){
        const post = {id: id, title: title, content: content};
        this.http.put<{message: string}>("http://localhost:3000/api/posts/"+id, post).subscribe(
            response =>{
                const updatedPosts = [...this.posts];
                const oldPostIndex = updatedPosts.findIndex(p => p.id == post.id);
                updatedPosts[oldPostIndex] = post;
                this.posts = updatedPosts;
                this.postsUpdate.next([...this.posts]);
            }
        )
    }

    deletePost(postId: string){
        this.http.delete("http://localhost:3000/api/posts/"+postId).subscribe(
            response => {
                console.log(response);
                const updatedPosts = this.posts.filter(post =>{
                    return post.id !== postId;
                })
                this.posts = updatedPosts;
                this.postsUpdate.next([...this.posts]);
            },
            error => console.log("error", error)
        )
    }

}