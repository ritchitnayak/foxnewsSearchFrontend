import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SearchService } from '../../services/search.service';


@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  @Output() searchQuery: EventEmitter<any> = new EventEmitter();

  searchForm = this.fb.group({
    q: [''],
    pgrank: ['default']
  });

  rankings = [
    { id: 'pgrank', name: "Page Ranking" }
  ];

  placeholder: string = 'Enter Query';
  keyword = 'q';
  historyHeading: string = 'Recently selected';
  suggestions = [];

  constructor(private fb: FormBuilder, private searchService: SearchService) { }

  ngOnInit(): void {
  
  }

  onSubmit() {
    const fdata = {
      q: this.searchForm.get('q').value,
      pgrank: this.searchForm.get('pgrank').value
    };
    this.searchQuery.emit(fdata);
  }

  onKeyUp(event) {
    if (event.key === "Enter") {
      this.onSubmit();
      this.suggestions = [];
    }
  }

  onChangeSearch(val : string) {
    if (val !== '') {
      this.searchService.suggest(`&q=${val}`).subscribe( obj => {
        this.suggestions = obj;
        console.log(this.suggestions);
      });
    }
  }

  onSelected(event) {
    const fdata = {
      q: event,
      pgrank: this.searchForm.get('pgrank').value
    };
    this.searchQuery.emit(fdata);
  }

  resetSuggestion() {
    this.suggestions = [];
  }

}
