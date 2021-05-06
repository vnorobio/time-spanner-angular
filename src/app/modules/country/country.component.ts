import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {CountryService} from '../../domain/country.service';
import {CountryDatasource} from '../../domain/country/country.datasource';
import {merge} from 'rxjs';
import {tap} from 'rxjs/operators';

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

  constructor(private countryService: CountryService) {

  }

  ngOnInit(): void {
    this.dataSource = new CountryDatasource(this.countryService);
    this.dataSource.loadCountries();
  }

  ngAfterViewInit(): void {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          this.dataSource.loadCountrySorted(this.sort, this.paginator);
        })
      )
      .subscribe();


  }



}
