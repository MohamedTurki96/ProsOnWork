import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, Scroll } from '@angular/router';
import { User } from 'src/app/shared/models/model';
import { routes } from 'src/app/shared/routes/routes';
import { SidebarService } from 'src/app/shared/side-bar/pages-sidebar.service';

@Component({
  selector: 'app-client-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  public routes = routes;
  public connectedUser: User | null = null;

  constructor(private sidebarService: SidebarService, private router: Router) {}

  ngOnInit(): void {
    const check = (url: string) => {
      if (url.includes('dashboard')) {
        this.connectedUser = {};
      } else {
        this.connectedUser = null;
      }
    };

    this.router.events.subscribe((x) => {
      if (x instanceof NavigationEnd) {
        check(x.url);
      } else if (x instanceof Scroll) {
        check(x.routerEvent.url);
      }
    });
  }

  public toggleSidebar(): void {
    this.sidebarService.openSidebar();
  }
  public hideSidebar(): void {
    this.sidebarService.closeSidebar();
  }
}
