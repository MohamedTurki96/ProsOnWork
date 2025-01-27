import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'app-client-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  public routes = routes
}
