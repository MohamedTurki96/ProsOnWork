import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { Category } from '../models/model';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private baseUrl = '/assets/json/categories.json';

  private subject = new BehaviorSubject<Category[]>([]);
  categories$ = this.subject.asObservable();

  constructor(private http: HttpClient) {}

  loadCategories() {
    return this.http.get(this.baseUrl).pipe(
      tap((res: any) => {
        this.subject.next(res.data);
      })
    );
  }
}
