import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Country} from './model/country.model';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {CountryService} from './country.service';
import {catchError} from 'rxjs/operators';

export class CountryDatasource implements DataSource<Country> {

  countriesSubject = new BehaviorSubject<Country[]>([]);
  countriesCountSubject = new BehaviorSubject<number>(0);
  pageSizeSubject = new BehaviorSubject<number>(10);

  constructor(private countryService: CountryService) {
  }

  connect(collectionViewer: CollectionViewer): Observable<Country[] | ReadonlyArray<Country>> {
    return this.countriesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.countriesSubject.complete();
    this.countriesCountSubject.complete();
    this.pageSizeSubject.complete();
  }

  loadCountries(pageNo?: number,
                pageSize?: number,
                sortBy?: string,
                sortOrder?: string,
                filter?: string): void {
    this.countryService.findAllCountries(pageNo,
      pageSize,
      sortBy,
      sortOrder,
      filter)
      .pipe(
        catchError(() => of([]))
      )
      .subscribe(
        response => {
          this.countriesSubject.next(response[`content`]);
          this.countriesCountSubject.next(response[`count`]);
          this.pageSizeSubject.next(pageSize);
        }
      );
  }

}
