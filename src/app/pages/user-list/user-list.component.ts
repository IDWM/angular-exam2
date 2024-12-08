import { Component, inject, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  private readonly userService = inject(UserService);

  protected users: User[] = [];

  protected readonly tableHeaders = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Nombre' },
    { key: 'email', label: 'Correo electrónico' },
    { key: 'birthDate', label: 'Fecha de nacimiento' },
    { key: 'gender', label: 'Género' },
  ];

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
      this.users.sort((a, b) => a.id - b.id);
    });
  }
}
