import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { SingnupComponent } from './auth/singnup/singnup.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
    {path: '', component: PostListComponent },
    {path: 'create', component: PostCreateComponent, canActivate: [AuthGuard] },
    {path: 'edit/:postId', component: PostCreateComponent, canActivate: [AuthGuard] },
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SingnupComponent},
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard] 
})

export class AppRoutingModule {};