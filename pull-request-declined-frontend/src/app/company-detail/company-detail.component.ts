import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from '../companies/modul/company';
import { CompanyService } from '../company.service';
import { Location } from '@angular/common';
import { Coord } from './modul/coordonates';
@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {
  coords: Coord[] = [];
  company_name: string;
  x: string[] = [];
  y: number[] = [];
  graph1: any;
  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private location: Location
  ) {
    this.company_name=""
  }

  ngOnInit(): void {
    this.getCoord();
  }

  
  // Line chart
  graph2 = {
    data: [
      { x: [1, 2, 3, 4, 5], y: [1, 4, 9, 4, 1], type: 'scatter' },
      { x: [1, 2, 3, 4, 5], y: [1, 3, 6, 9, 6], type: 'scatter' },
      { x: [1, 2, 3, 4, 5], y: [1, 2, 4, 5, 6], type: 'scatter' },
    ],
    layout: {title: 'Some Data to Highlight'}
  };

  getCoord(): void {
    const id = String(this.route.snapshot.paramMap.get('company_name'));
    this.company_name = id;
    this.companyService.getCoord(id)
      .subscribe(coord => {this.coords = coord;
        for(let i = 0; i < this.coords.length; i++) {
            this.x.push(this.coords[i].x);
            this.y.push(this.coords[i].y)
        }
        this.graph1 = {
          data: [
            { x: this.x, y: this.y, type: 'scatter' },
          ],
          layout: {title: this.company_name}
        };
      });
  }

  goBack(): void {
    this.location.back();
  }

  // save(): void {
  //   if (this.company) {
  //     this.companyService.updateCompany(this.company)
  //       .subscribe(() => this.goBack());
  //   }
  // }
}
