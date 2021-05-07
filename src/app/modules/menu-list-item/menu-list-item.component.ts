import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {MenuItem} from '../../domain/menu/model/menu-item.interface';
import {MenuService} from '../../domain/menu/menu.service';
import {Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class MenuListItemComponent implements OnInit {

  expanded: boolean;
  @Input() item: MenuItem;
  @Input() depth: number;
  // @ts-ignore
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;


  constructor(public menuService: MenuService, public router: Router) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit(): void {
    this.menuService.currentUrl.subscribe((url: string) => {
      if (this.item.route && url) {
        // console.log(`Checking '/${this.item.route}' against '${url}'`);
        this.expanded = url.indexOf(`/${this.item.route}`) === 0;
        this.ariaExpanded = this.expanded;
        // console.log(`${this.item.route} is expanded: ${this.expanded}`);
      }
    });
  }

  onItemSelected(item: MenuItem): void {
    if (!item.children || !item.children.length){
      this.router.navigate([item.route]);
      this.menuService.closeNav();
    }

    if (item.children && item.children.length){
      this.expanded = !this.expanded;
    }
  }
}
