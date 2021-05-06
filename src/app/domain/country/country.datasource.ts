import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Country} from './model/country.model';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {CountryService} from '../country.service';
import {catchError} from 'rxjs/operators';
import {Sort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

export class CountryDatasource implements DataSource<Country> {

  countriesSubject = new BehaviorSubject<Country[]>([]);
  countriesCountSubject = new BehaviorSubject<number>(0);
  constructor(private countryService: CountryService) {
  }

  connect(collectionViewer: CollectionViewer): Observable<Country[] | ReadonlyArray<Country>> {
    return this.countriesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.countriesSubject.complete();
    this.countriesCountSubject.complete();
  }

  loadCountries(): void {
    this.countryService.findAllCountries()
      .pipe(
        catchError(() => of([]))
      )
      .subscribe(
        response => {
          this.countriesSubject.next(response[`content`]);
          this.countriesCountSubject.next(response[`count`]);
        }
      );
  }

  loadCountrySorted(sort: Sort, paginator: MatPaginator): void {
    console.log(paginator);
    this.countryService.findAllCountries()
      .pipe(
        catchError(() => of([]))
      )
      .subscribe(
        response => {
            response[`content`].sort((a, b) => {
              const isAsc = sort?.direction === 'asc';
              switch (sort?.active) {
                case 'name': return compare(a.name, b.name, isAsc);
                case 'alpha3Code': return compare(a.alpha3Code, b.alpha3Code, isAsc);
                case 'numericCode': return compare(+a.numericCode, +b.numericCode, isAsc);
                default: return 0;
              }
            });
            const c = (paginator.pageIndex) * paginator.pageSize;
            const e = ((paginator.pageIndex) * paginator.pageSize) + paginator.pageSize;
            this.countriesCountSubject.next(response[`count`]);
            this.countriesSubject.next(
            response[`content`].slice(c, e)
          );
        }

      );
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
