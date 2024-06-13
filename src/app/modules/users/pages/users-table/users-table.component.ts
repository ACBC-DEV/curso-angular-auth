import { Component, type OnInit, inject } from '@angular/core';

import { DataSourceUser } from './data-source';
import { UsersService } from '@services/users.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html'
})
export class UsersTableComponent implements OnInit {
  usersService = inject(UsersService)
  dataSource = new DataSourceUser();
  columns: string[] = ['id', 'avatar', 'name', 'email'];


  ngOnInit() {
    this.getUsers()
    this.usersService.getUsers().subscribe((users) => {
      this.dataSource.init(users)
    })
  }
  getUsers() {
    this.usersService.getUsers().subscribe((users) => {
      this.dataSource.init(users)
    })
  }
}
