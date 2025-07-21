import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'BookStore App';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const user: User = {
      username: 'BookStoreApp',
      password: '123456'
    };

    // Tenta criar o usuário
    this.authService.createUser(user).subscribe({
      next: () => {
        console.log('Usuário criado com sucesso');
        this.login(user);
      },
      error: (err) => {
        if (err.status === 409) {
          // Usuário já existe, realiza login
          console.log('Usuário já existe, realizando login');
          this.login(user);
        } else {
          console.error('Erro ao criar usuário:', err);
        }
      }
    });
  }

  login(user: User): void {
    this.authService.login(user).subscribe({
      next: (res) => {
        console.log('Login bem-sucedido');
        this.authService.saveToken(res.token);
      },
      error: (err) => {
        console.error('Erro ao fazer login:', err);
      }
    });
  }
}
