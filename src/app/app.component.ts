import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Pessoa } from './model/pessoa';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  pessoas: Pessoa[] = [];
  indice: number = -1;

  formulario = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
    idade: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(0),
      Validators.max(120),
    ]),
    cidade: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  btnCadastrar: boolean = true;

  cadastrar() {
    this.pessoas.push(this.formulario.value as Pessoa);

    this.formulario.reset();

    //console.table(this.pessoas);
  }

  selecionar(indice: number) {
    this.indice = indice;
    this.formulario.setValue({
      nome: this.pessoas[indice].nome,
      idade: this.pessoas[indice].idade,
      cidade: this.pessoas[indice].cidade,
    });

    this.btnCadastrar = false;
  }

  update() {
    this.pessoas[this.indice] = this.formulario.value as Pessoa;
    this.formulario.reset();
    this.btnCadastrar = true;
  }

  remove() {
    this.pessoas.splice(this.indice, 1);
    this.formulario.reset();
    this.btnCadastrar = true;
  }

  cancel() {
    this.formulario.reset();
    this.btnCadastrar = true;
  }
}
