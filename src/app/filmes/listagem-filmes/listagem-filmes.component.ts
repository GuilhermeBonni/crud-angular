import { Router } from '@angular/router';
import { ConfigParams } from './../../shared/models/config-params';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { FilmesService } from './../../core/filmes.service';
import { Component, OnInit } from '@angular/core';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {

  readonly semFoto = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Item_sem_imagem.svg/498px-Item_sem_imagem.svg.png'

  config: ConfigParams = {
    pagina: 0,
    limite: 4
  }
  filmes: Filme[] = [];
  filtrosListagem: FormGroup;
  generos: Array<string>;

  constructor(private filmesService: FilmesService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
  this.filtrosListagem = this.fb.group({
    texto: [''],
    genero:['']
  });

  this.filtrosListagem.get('texto').valueChanges
  .pipe(debounceTime(400))
  .subscribe((val: string) => {
    this.config.pesquisa = val;
    this.resetarConsulta();
  });

  this.filtrosListagem.get('genero').valueChanges.subscribe((val: string) => {
    this.config.campo = {tipo: 'genero', valor: val};
    this.resetarConsulta();
  });

  this.generos = ['Ação', 'Romance', 'Aventura', 'Terror', 'Ficção Científica', 'Comédia', 'Drama'];

    this.listarFilmes();
  }

  onScroll(): void {
    this.listarFilmes();
  }

  abrir(id: number): void {
    this.router.navigateByUrl('/filmes/' + id);
  }

  private listarFilmes(): void {
    this.config.pagina++;
    this.filmesService.listar(this.config)
      .subscribe((filmes: Filme[]) => this.filmes.push(...filmes));
  }

  private resetarConsulta(): void {
    this.config.pagina = 0;
    this.filmes = [];
    this.listarFilmes();
  }
}
