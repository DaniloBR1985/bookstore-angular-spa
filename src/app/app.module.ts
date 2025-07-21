import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { GenresComponent } from './pages/genres/genres.component';
import { AuthorsComponent } from './pages/authors/authors.component';
import { BooksComponent } from './pages/books/books.component';

import { AuthService } from './services/auth.service';
import { AuthorService } from './services/author.service';
import { GenreService } from './services/genre.service';
import { BookService } from './services/book.service';

import { JwtInterceptor } from './core/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    GenresComponent,
    AuthorsComponent,
    BooksComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [
    AuthService,
    AuthorService,
    GenreService,
    BookService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
