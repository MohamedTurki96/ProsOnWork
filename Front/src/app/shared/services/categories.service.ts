import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { Category } from '../models/model';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private baseUrl = '/assets/json/categories.json';

  private categoriesSubject = new BehaviorSubject<Category[]>([]);
  categories$ = this.categoriesSubject.asObservable();

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get(this.baseUrl).pipe(
      tap((res: any) => {
        this.categoriesSubject.next(res.data);
      })
    );
  }
}
