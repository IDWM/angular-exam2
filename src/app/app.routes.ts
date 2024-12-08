import { Routes } from '@angular/router';
import { UserListComponent } from './pages/user-list/user-list.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';

export const routes: Routes = [
  {
    path: 'user',
    component: UserListComponent,
  },
  {
    path: 'user/create',
    component: CreateUserComponent,
  },
];
