import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './pages/books/books.component';
import { AuthorsComponent } from './pages/authors/authors.component';
import { GenresComponent } from './pages/genres/genres.component';

const routes: Routes = [
  { path: 'genres', component: GenresComponent },
  { path: 'authors', component: AuthorsComponent },
  { path: 'books', component: BooksComponent },
  { path: '', redirectTo: 'genres', pathMatch: 'full' },
  { path: '**', redirectTo: 'genres' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
