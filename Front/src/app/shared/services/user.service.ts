import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from '../models/model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = '/assets/json/categories.json';

  private subject = new BehaviorSubject<User | null>(null);
  user$ = this.subject.asObservable();

  constructor(private http: HttpClient) {}

  getConnectedUser() {
    return this.http.get(this.baseUrl).pipe(
      tap((data) => {
        this.subject.next(null);
      })
    );
  }
}
