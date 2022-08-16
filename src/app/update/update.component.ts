import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from './../movies.service';
import { Movie } from '../Models/movies';
import { ActivatedRoute } from '@angular/router'; //so that we cal use the details:id or :id in the router params
import { Location } from '@angular/common';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  @Input()movie!: Movie;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private movieService: MoviesService
              ) { }

  ngOnInit(): void {
    this.getMovieFromParam();
  }


  getMovieFromParam():void {
    const id = +this.route.snapshot.paramMap.get('id')!; //paramMap returns a string and by putting a plus infront of it we are converting that string to a number. teh exclamation mark is telling typsescript that this is not an undefined value or null
    this.movieService.getMovieById(id).subscribe(theMovie => this.movie = theMovie)
  }

  goBack():void {
    this.location.back();
  }

  update():void {
    this.movieService.updateMovie(this.movie).subscribe( ()=> this.goBack());
  }

  deletedMovie(id: number): void {
    this.movieService.deleteMovie(id).subscribe ( () => this.goBack());
  }
}
