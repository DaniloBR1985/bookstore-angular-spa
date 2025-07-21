import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import { AuthorService } from 'src/app/services/author.service';
import { GenreService } from 'src/app/services/genre.service';
import { Author } from 'src/app/models/author.model';
import { Genre } from 'src/app/models/genre.model';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  book: Book = { title: '', genreId: 0, genreName: '', authorId: 0, authorName: '' };
  authors: Author[] = [];
  genres: Genre[] = [];
  isEdit: boolean = false;

  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
    private genreService: GenreService
  ) { }

  ngOnInit(): void {
    this.getBooks();
    this.getAuthors();
    this.getGenres();
  }

  getBooks(): void {
    this.bookService.getAll().subscribe(data => {
      this.books = data;
    });
  }

  getAuthors(): void {
    this.authorService.getAll().subscribe(data => {
      this.authors = data;
    });
  }

  getGenres(): void {
    this.genreService.getAll().subscribe(data => {
      this.genres = data;
    });
  }

  save(): void {
    if (this.isEdit && this.book.id) {
      this.bookService.update(this.book.id, this.book).subscribe({
        next: () => {
          this.resetForm();
          this.getBooks();
        },
        error: (error) => {
          this.handleError(error);
        }
      });
    } else {
      this.bookService.create(this.book).subscribe({
        next: () => {
          this.resetForm();
          this.getBooks();
        },
        error: (error) => {
          this.handleError(error);
        }
      });
    }
  }

  handleError(error: any): void {
    if (error.status === 409 && error.error?.message) {
      alert('Erro de conflito: ' + error.error.message);
    } else {
      alert('Erro ao salvar autor. Tente novamente.');
      console.error('Erro completo:', error);
    }
  }

  edit(book: Book): void {
    this.book = { ...book };
    this.isEdit = true;
  }

  delete(id: number): void {
    if (confirm('Tem certeza que deseja excluir?')) {
      this.bookService.delete(id).subscribe(() => {
        this.getBooks();
      });
    }
  }

  resetForm(): void {
    this.book = { title: '', genreId: 0, authorId: 0, authorName: '', genreName: '' };
    this.isEdit = false;
  }
}
