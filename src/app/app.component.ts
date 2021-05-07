import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {MenuItem} from './domain/menu/model/menu-item.interface';
import {MenuService} from './domain/menu/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements AfterViewInit{
  title = 'time-spanner-angular';
  menuItems: MenuItem[] = [
    {
      displayName: 'Home',
      disabled: false,
      iconName: 'home',
      route: '',
      children: []
    },
    {
      displayName: 'Territorial divisions',
      disabled: false,
      iconName: 'map',
      route: '',
      children: [
        {
          displayName: 'Country',
          disabled: false,
          iconName: 'map',
          route: 'countries',
          children: []
        },
        {
          displayName: 'Department',
          disabled: false,
          iconName: 'map',
          route: 'division',
          children: []
        },
        {
          displayName: 'City',
          disabled: false,
          iconName: 'map',
          route: 'subdivision',
          children: []
        }
      ]
    }
  ];
  @ViewChild(MatSidenav) sideNav: MatSidenav;

  constructor(private menuService: MenuService) {
  }

  ngAfterViewInit(): void {
    this.menuService.sideNav = this.sideNav;
  }
}
