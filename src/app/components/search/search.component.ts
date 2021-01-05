import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { Item } from '../../models/Item';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  fdata: any;
  p: number = 1;
  res_count: number = 0;
  items: Item[];
  math = Math;
  correct: boolean = true;
  isCorrected: boolean = false;
  orig_query: string;
  corr_query: string;

  constructor(private searchService:SearchService) { }

  ngOnInit(): void {
  }

  searchQuery(fdata) {
    this.fdata = fdata;
    this.p = 1;
    this.correct = true;
    const url: string = Object.keys(fdata).map(key => key + '=' + fdata[key]).join('&');
    this.searchService.search(url+`&page=${this.p}&correct=${this.correct}`).subscribe( obj => {
        this.res_count = obj['res_count'];
        this.items = obj['result'];
        this.isCorrected = obj['isCorrected'];
        this.orig_query = obj['oquery'];
        this.corr_query = obj['cquery'];
    });
  }

  getPage(page: number) {
    const url: string = Object.keys(this.fdata).map(key => key + '=' + this.fdata[key]).join('&');
    this.searchService.search(url+`&page=${page}&correct=${this.correct}`).subscribe( obj => {
      this.res_count = obj['res_count'];
      this.items = obj['result'];
      this.p = page;
    });
  }

  origQuery() {
    this.p = 1;
    this.correct = false;
    const url: string = Object.keys(this.fdata).map(key => key + '=' + this.fdata[key]).join('&');
    this.searchService.search(url+`&page=${this.p}&correct=false`).subscribe( obj => {
        this.res_count = obj['res_count'];
        this.items = obj['result'];
        this.isCorrected = obj['isCorrected'];
        this.orig_query = obj['oquery'];
        this.corr_query = obj['cquery'];
    });
  }

}
