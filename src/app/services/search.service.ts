import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http:HttpClient) { }

  search(url: string):Observable<any> {
    return this.http.get('/api/search?'+url);
  }

  suggest(url: string):Observable<any> {
    return this.http.get('/api/autocomplete?'+url);
  }
}
