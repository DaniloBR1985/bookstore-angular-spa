# BookstoreApp

Esta aplicação é uma **Single Page Application (SPA)** desenvolvida em **Angular 15.2.11**, que consome uma **API com autenticação JWT** e permite realizar operações de **CRUD** para Gêneros, Autores e Livros.

Passos para rodar a aplicação precisamos das versões de Node e Angular abaixo.
**Node.js** `v16.x` ou `v18.x
**Angular CLI** `15.2.11`

Para instalar o Angular CLI (caso não tenha):

```bash
npm install -g @angular/cli@15.2.11
npm install

Editar o valor de apiUrl no environment, colocar o endereço da Api Book StoreAPI que está no projeto.

Para rodar a aplicação digitar no bash
ng serve
 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
