import { Component, OnInit } from '@angular/core';
import { Author } from 'src/app/models/author.model';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {
  authors: Author[] = [];
  author: Author = { name: '' };
  isEdit: boolean = false;

  constructor(private authorService: AuthorService) { }

  ngOnInit(): void {
    this.getAuthors();
  }

  getAuthors(): void {
    this.authorService.getAll().subscribe(data => {
      this.authors = data;
    });
  }

  save(): void {
    if (this.isEdit && this.author.id) {
      this.authorService.update(this.author.id, this.author).subscribe({
        next: () => {
          this.resetForm();
          this.getAuthors();
        },
        error: (error) => {
          this.handleError(error);
        }
      });
    } else {
      this.authorService.create(this.author).subscribe({
        next: () => {
          this.resetForm();
          this.getAuthors();
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

  edit(author: Author): void {
    this.author = { ...author };
    this.isEdit = true;
  }

  delete(id: number): void {
    if (confirm('Tem certeza que deseja excluir?')) {
      this.authorService.delete(id).subscribe(() => {
        this.getAuthors();
      });
    }
  }

  resetForm(): void {
    this.author = { name: '' };
    this.isEdit = false;
  }
}
