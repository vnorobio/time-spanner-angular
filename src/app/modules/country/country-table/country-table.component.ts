import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {CountryService} from '../../../domain/country/country.service';
import {CountryDatasource} from './country.datasource';
import {fromEvent, merge, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, takeUntil, tap} from 'rxjs/operators';

@Component({
  selector: 'app-country',
  templateUrl: './country-table.component.html',
  styleUrls: ['./country-table.component.scss']
})
export class CountryTableComponent implements OnInit, AfterViewInit, OnDestroy {

  private componentIsDestroyed$ = new Subject<boolean>();

  dataSource: CountryDatasource;
  displayedColumns: string[] = ['alpha3Code', 'name', 'numericCode', 'delete'];

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

  onDelete(id): void {
    this.countryService.deleteCountry(id)
      .pipe(takeUntil(this.componentIsDestroyed$))
      .subscribe(
        () => this.loadCountriesPaged()
      );
  }

  ngOnDestroy(): void {
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }
}
