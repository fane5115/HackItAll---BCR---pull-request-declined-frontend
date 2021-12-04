import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { CompanyService } from '../company.service';
import { Company } from '../companies/modul/company';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

@Component({
  selector: 'app-company-search',
  templateUrl: './company-search.component.html',
  styleUrls: ['./company-search.component.css']
})
export class CompanySearchComponent implements OnInit {
  companies$!: Observable<Company[]>;
  private searchTerms = new Subject<string>();

  constructor(private companyService: CompanyService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.companies$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.companyService.searchCompanyes(term)),
    );
  }

}
