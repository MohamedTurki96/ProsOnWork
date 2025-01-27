import { NgModule } from '@angular/core';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { UserService } from './user.service';
import { CategoriesService } from './categories.service';

@NgModule({
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    UserService,
    CategoriesService,
  ],
})
export class ServicesModule {}
