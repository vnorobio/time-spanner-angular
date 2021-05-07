import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {CountryService} from '../../domain/country/country.service';
import {CountryDatasource} from '../../domain/country/country.datasource';
import {fromEvent, merge} from 'rxjs';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit, AfterViewInit {
  dataSource: CountryDatasource;
  displayedColumns: string[] = ['alpha3Code', 'name', 'numericCode', 'edit', 'delete'];

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild('filterInput', {static: false}) filter: ElementRef;

  constructor(private countryService: CountryService) {

  }

  ngOnInit(): void {
    this.dataSource = new CountryDatasource(this.countryService);
    this.dataSource.loadCountries(0, 10);
  }

  ngAfterViewInit(): void {
    fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadCountriesPaged();
        })
      ).subscribe();

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          this.loadCountriesPaged();
        })
      )
      .subscribe();
  }

  private loadCountriesPaged(): void {
    this.dataSource.loadCountries(
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.sort?.active,
      this.sort?.direction,
      this.filter.nativeElement.value);
  }
}
