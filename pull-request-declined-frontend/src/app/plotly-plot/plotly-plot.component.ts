import { Component, OnInit, Input } from '@angular/core';
import { CompanyDetailComponent } from '../company-detail/company-detail.component';
import { Coord } from '../company-detail/modul/coordonates';

@Component({
    selector: 'plotly-example',
    template: '<plotly-plot [data]="graph.data" [layout]="graph.layout"></plotly-plot>',

})
export class PlotlyPlotComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }
  public graph = {
    data: [
        { x: [1, 2, 3], y: [2, 6, 3], type: 'scatter', mode: 'lines+points', marker: {color: 'red'} },
        
    ],
    layout: {width: 500, height: 500, title: 'A Fancy Plot'}
};
  

}
