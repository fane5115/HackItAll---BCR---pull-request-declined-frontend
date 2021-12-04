import { Component, OnInit } from '@angular/core';
import { Company } from './modul/company';
import { CompanyService } from '../company.service';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  companies: Company[] = [];
  myControl = new FormControl();
  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.getCompanies();
  }
  
  getCompanies(): void {
    this.companyService.getCompanies()
        .subscribe(companies => {this.companies = companies});
    
  }


}
