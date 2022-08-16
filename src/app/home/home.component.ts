import { Component, OnInit } from '@angular/core';
import { MoviesService } from './../movies.service';
import { Movie } from '../Models/movies';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  selectedMovie!: Movie; //selected movie has a type of movie
  movies!: Movie[];

  constructor(private movieService: MoviesService) { }

  ngOnInit(): void {
    this.getMoviesFromSevice(); //we have to declare it on it so that it calls the movies onit

  }

  getMoviesFromSevice():void { //fetching movies from the service
    // this.movies = this.movieService.getMovies(); //changed to the infor below so that ths information can be made into an ascynchronous call
    this.movieService.getMovies().subscribe(
      (newMovies) => {
        this.movies = newMovies
        console.log(`this.movies is ${JSON.stringify(this.movies)}`)
      }
      );
  }

}
