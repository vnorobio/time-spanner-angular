import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {NavigationEnd, Router} from '@angular/router';

@Injectable()
export  class MenuService{

  public sideNav: any;
  public currentUrlBSubject$ = new BehaviorSubject<string>(undefined);

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof  NavigationEnd) {
        this.currentUrlBSubject$.next(event.urlAfterRedirects);
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
