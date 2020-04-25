import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SingnupComponent } from './singnup/singnup.component';

const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SingnupComponent},
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule]
})

export class AuthRoutingModule {};