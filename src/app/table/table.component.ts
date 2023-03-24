import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  searchInput$ = new Subject<string>();
  users = [
    { username: 'john', email: 'john@example.com', phone: '1234567890', gender: 'male' },
    { username: 'jane', email: 'jane@example.com', phone: '0987654321', gender: 'female' },
    { username: 'bob', email: 'bob@example.com', phone: '9876543210', gender: 'male' }
  ];

  filteredUsers$ = this.searchInput$.pipe(
    switchMap((searchTerm: string) => {
      return this.searchUsers(searchTerm);
    })
  );

  constructor() { }

  ngOnInit(): void {
  }

  searchUsers(searchTerm: string) {
    const regex = new RegExp(searchTerm, 'i');
    return this.users.filter(user => {
      return regex.test(user.username) || regex.test(user.email);
    });
  }
}
