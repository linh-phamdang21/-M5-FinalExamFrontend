import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Book} from "../model/Book";

const apiUrl = 'http://localhost:8080/api/books';
@Injectable({
  providedIn: 'root'
})
export class BookService {

  shouldRefresh = new Subject<any>();

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(apiUrl);
  }
  getById(id: number): Observable<Book>{
    return this.httpClient.get<Book>(`${apiUrl}/${id}`);
  }
  createBook(book: Book): Observable<Book>{
    return this.httpClient.post<Book>(apiUrl, book);
  }
  updateBook(book: Book): Observable<Book>{
    return this.httpClient.put<Book>(apiUrl, book);
  }
  deleteBook(id: number): Observable<any>{
    return this.httpClient.delete(`${apiUrl}/${id}`);
  }
}
