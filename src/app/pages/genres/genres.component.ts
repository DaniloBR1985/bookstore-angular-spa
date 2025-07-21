import { Component, OnInit } from '@angular/core';
import { Genre } from 'src/app/models/genre.model';
import { GenreService } from 'src/app/services/genre.service';
@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {
  genres: Genre[] = [];
  genre: Genre = { name: '' };
  isEdit: boolean = false;

  constructor(private genreService: GenreService) { }

  ngOnInit(): void {
    this.getGenres();
  }

  getGenres(): void {
    this.genreService.getAll().subscribe(data => {
      this.genres = data;
    });
  }

  save(): void {
    if (this.isEdit && this.genre.id) {
      this.genreService.update(this.genre.id, this.genre).subscribe({
        next: () => {
          this.resetForm();
          this.getGenres();
        },
        error: (error) => {
          this.handleError(error);
        }
      });
    } else {
      this.genreService.create(this.genre).subscribe({
        next: () => {
          this.resetForm();
          this.getGenres();
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

  edit(genre: Genre): void {
    this.genre = { ...genre };
    this.isEdit = true;
  }

  delete(id: number): void {
    if (confirm('Tem certeza que deseja excluir?')) {
      this.genreService.delete(id).subscribe(() => {
        this.getGenres();
      });
    }
  }

  resetForm(): void {
    this.genre = { name: '' };
    this.isEdit = false;
  }
}
