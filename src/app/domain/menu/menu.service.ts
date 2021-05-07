import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {NavigationEnd, Router} from '@angular/router';

@Injectable()
export  class MenuService{

  public sideNav: any;
  public currentUrl = new BehaviorSubject<string>(undefined);

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof  NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });
  }

  public openNav(): void{
    this.sideNav.open();
  }

  public closeNav(): void{
    this.sideNav.close();
  }

}
