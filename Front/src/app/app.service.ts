import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, forkJoin } from 'rxjs';
import { CategoriesService } from './shared/services/categories.service';
import { UserService } from './shared/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private appInitSubject = new BehaviorSubject<boolean>(false);
  public appInit$ = this.appInitSubject.asObservable();
  constructor(
    private categories: CategoriesService,
    private user: UserService
  ) {}

  initApp() {
    forkJoin([
      this.categories.loadCategories(),
      this.user.loadUser(),
    ]).subscribe(() => this.appInitSubject.next(true));
  }
}
