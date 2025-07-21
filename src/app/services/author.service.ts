import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Author } from '../models/author.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private readonly apiUrl = environment.apiUrl + '/v1.0/authors';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Author[]> {
    return this.http.get<Author[]>(this.apiUrl);
  }

  getById(id: number): Observable<Author> {
    return this.http.get<Author>(`${this.apiUrl}/${id}`);
  }

  create(author: Author): Observable<Author> {
    return this.http.post<Author>(this.apiUrl, author);
  }

  update(id: number, author: Author): Observable<Author> {
    return this.http.put<Author>(`${this.apiUrl}/${id}`, author);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
