import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private baseUrl = '/assets/json/services.json';
  
  constructor(private http: HttpClient) {}

  getServices() {
    return this.http.get(this.baseUrl);
  }
}
