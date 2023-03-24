import { Component, OnInit } from '@angular/core';
import { of, tap, map, pipe, Subscribable, Observable } from 'rxjs'
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// export class AppComponent {
//   title = 'rxjsopas';
  
// a =of(Math.random()).pipe(
//   tap(console.log),
//   map(n => n > 0.5 ? 'big' : 'small') 
// ).subscribe(console.log);
// //  a = of([1, 2, 3, 4, 5])  
// // .subscribe(  
// //   next => console.log('The returned array is:', next),  
// //   err => console.log('error:', err),  
// //   () => console.log('the end'),  
// // );  

// }
export class AppComponent implements OnInit{
  title = 'rxjsopas';
  searchInput$ = new Subject<string>();
  users = [
    { username: 'john', email: 'john@example.com', phone: '1234567890', gender: 'male' },
    { username: 'jane', email: 'jane@example.com', phone: '0987654321', gender: 'female' },
    { username: 'bob', email: 'bob@example.com', phone: '9876543210', gender: 'male' }
  ];

  filteredUsers$:Observable<any[]> = this.searchInput$.pipe(
    switchMap((searchTerm: string) => {
      console.log(searchTerm)
      console.log(this.searchUsers(searchTerm)); 
      
      return <any[]>this.searchUsers(searchTerm)  
    })
  );

  constructor() { }

  ngOnInit(): void {
  }

  search(event:any){
    this.searchInput$.next((event?.target as HTMLInputElement).value ?? '')
  }

  searchUsers(searchTerm: string) {
    const regex = new RegExp(searchTerm, 'i');

    return this.users.filter(user => {
      return regex.test(user.username) || regex.test(user.email);
    });
  }
}
