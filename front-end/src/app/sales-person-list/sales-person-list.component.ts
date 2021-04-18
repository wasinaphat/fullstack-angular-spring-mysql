import { Component, OnInit } from '@angular/core';
import { SalesPerson } from './sales-person';

@Component({
  selector: 'app-sales-person-list',
  templateUrl: './sales-person-list-bootstrap.component.html',
  styleUrls: ['./sales-person-list.component.css']
})
export class SalesPersonListComponent implements OnInit {
//create an array of objects

salePersonList:SalesPerson[]=[
  new SalesPerson("wasinapl","wasinapl","wasinapl@scg.com",50000),
  new SalesPerson("tig","tig","wasinapl1@scg.com",40000),
  new SalesPerson("wasin","wasin","wasinapl3@scg.com",90000),
  new SalesPerson("Mali","Tong","mali@scg.com",60000),
];
  constructor() { }

  ngOnInit(): void {
  }

}
