import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {
  apiUrl = 'https://online-movie-database.p.rapidapi.com/title/v2/find'

  constructor(private http: HttpClient){}

  getAllFilm(input: {search: string, pagination?: {limit: number,paginationKey: number}, sort?: string}):Observable<any>{
     const {search,pagination,sort} = input;
     let url = `${this.apiUrl}?title=${search}`;

     if(pagination) {
      url += `&limit=${pagination.limit}&paginationKey=${pagination.paginationKey}`
     }

     if(sort) {
      url += `&sortArg=${sort}`
     }



    return  this.http.get<any>(url);
  }



}

