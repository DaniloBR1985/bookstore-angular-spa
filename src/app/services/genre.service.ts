import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Genre } from '../models/genre.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  private readonly apiUrl = environment.apiUrl + '/v1.0/genres';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Genre[]> {
    return this.http.get<Genre[]>(this.apiUrl);
  }

  getById(id: number): Observable<Genre> {
    return this.http.get<Genre>(`${this.apiUrl}/${id}`);
  }

  create(genre: Genre): Observable<Genre> {
    return this.http.post<Genre>(this.apiUrl, genre);
  }

  update(id: number, genre: Genre): Observable<Genre> {
    return this.http.put<Genre>(`${this.apiUrl}/${id}`, genre);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
