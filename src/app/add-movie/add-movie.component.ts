import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';
import { Movie } from '../Models/movies';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {

  movies!: Movie[];

  constructor(private movieService: MoviesService) { }

  ngOnInit(): void {
  }

  newMovie(name: string,
    description: string,
    releaseYear: string,
    image: string):void {
    name = name.trim();
    description = description.trim();
    image = image.trim();
            if (Number.isNaN(Number(releaseYear))|| !name || !description || !image || Number(releaseYear)<=0) {
              alert("Name, Description and Image cannot be blank! Release year must be a valid number and year");
              return;
            }
    const newMovie: Movie = new Movie();
    newMovie.name = name;
    newMovie.description = description;
    newMovie.releaseYear = +releaseYear
    newMovie.image = image;
    this.movieService.createNewMovie(newMovie)
        .subscribe(createdMovie => {
          this.movies.push(createdMovie);
          console.log(`this.movies.push(createdMovie) = ${JSON.stringify(createdMovie)}`)
        });
        alert("The Movie " + newMovie.name + " has been added");
    }

}
