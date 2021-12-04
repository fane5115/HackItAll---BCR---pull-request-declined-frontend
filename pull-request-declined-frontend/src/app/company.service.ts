import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Company } from './companies/modul/company';
import { COMPANIES } from './test-companies';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Coord } from './company-detail/modul/coordonates';

@Injectable({
  providedIn: 'root'
})

export class CompanyService {
  private companiesUrl = 'http://pullreqdeclined-env-1.eba-bwc6ewuw.eu-west-1.elasticbeanstalk.com/companies';
  constructor(private http: HttpClient, private messageService: MessageService) { }

  private log(message: string) {
    this.messageService.add(`CompanyService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  
  
  // httpOptions = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  // };

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.companiesUrl)
      .pipe(
        tap(_ => this.log('fetched companies')),
        catchError(this.handleError<Company[]>('getCompanies', []))
      );
  }

  // getCompanyNo404<Data>(id: string): Observable<Company> {
  //   const url = `${this.companiesUrl}/?id=${id}`;
  //   return this.http.get<Company[]>(url)
  //     .pipe(
  //       map(companies => companies[0]), // returns a {0|1} element array
  //       tap(h => {
  //         const outcome = h ? `fetched` : `did not find`;
  //         this.log(`${outcome} Company id=${id}`);
  //       }),
  //       catchError(this.handleError<Company>(`getCompany id=${id}`))
  //     );
  // }

  getCoord(id: string): Observable<Coord[]> {
    const url = `${this.companiesUrl}/${id}`;
    return this.http.get<Coord[]>(url).pipe(
      tap(_ => this.log(`fetched Company id=${id}`)),
      catchError(this.handleError<Coord[]>(`getCompany id=${id}`))
    );
  }

  /* GET Companyes whose name contains search term */
  searchCompanyes(term: string): Observable<Company[]> {
    if (!term.trim()) {
      // if not search term, return empty Company array.
      return of([]);
    }
    return this.http.get<Company[]>(`${this.companiesUrl}/?=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found Companyes matching "${term}"`) :
         this.log(`no Companyes matching "${term}"`)),
      catchError(this.handleError<Company[]>('searchCompanyes', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new Company to the server */
  // addCompany(Company: Company): Observable<Company> {
  //   return this.http.post<Company>(this.companiesUrl, Company, this.httpOptions).pipe(
  //     tap((newCompany: Company) => this.log(`added Company w/ id=${newCompany.id}`)),
  //     catchError(this.handleError<Company>('addCompany'))
  //   );
  // }

  // /** DELETE: delete the Company from the server */
  // deleteCompany(id: number): Observable<Company> {
  //   const url = `${this.companiesUrl}/${id}`;

  //   return this.http.delete<Company>(url, this.httpOptions).pipe(
  //     tap(_ => this.log(`deleted Company id=${id}`)),
  //     catchError(this.handleError<Company>('deleteCompany'))
  //   );
  // }

  // /** PUT: update the Company on the server */
  // updateCompany(Company: Company): Observable<any> {
  //   return this.http.put(this.companiesUrl, Company, this.httpOptions).pipe(
  //     tap(_ => this.log(`updated Company id=${Company.id}`)),
  //     catchError(this.handleError<any>('updateCompany'))
  //   );
  // }
}
