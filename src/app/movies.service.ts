import { Injectable } from '@angular/core';
import { Movie } from './Models/movies';
import { Observable, of } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { catchError, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private rest_api = "http://localhost:3000/movies"; //base url for api
  private http_Header = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };


  constructor(private http: HttpClient) { }


  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.rest_api).pipe(
      tap( retrievedMovies => console.log(`retrievedMovies = ${JSON.stringify(retrievedMovies)}`)), //if retrieval is successful
      catchError(error => of([])),
    );
  }

  getMovieById(id: number):Observable<Movie | any> {
    const thisUrl = `${this.rest_api}/${id}`; //the string interpolation is looking for exactly the localhost:3000 / (the id of the selected movie)
    return this.http.get<Movie>(thisUrl).pipe(
      tap( thisMovie => console.log(`thisMovie = ${JSON.stringify(thisMovie)}`)), //if retrieval is successful
      catchError(error => of(new Movie())), //if there is an error
    );
  }

  updateMovie(movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(`${this.rest_api}/${movie.id}`, movie, this.http_Header).pipe( // WE are sending a put request to the url and this put request accepts 3 arguments (the url), (the body or the fields we want to update in this case we are sending the fields for movie), (and the Http headers which specifies that the application is json and as such should be converted when the put requests executes to match this )
      tap(updatedMovie => console.log(`updatedMovie = ${JSON.stringify(updatedMovie)}`)), //if retrieval is successful do this( create a variable and put the console to it)
      catchError(error => of(new Movie())), //if there is an error (returns an empty movie object)
    );
  }

  createNewMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this.rest_api}`, movie, this.http_Header).pipe( // WE are sending a put request to the url and this put request accepts 3 arguments (the url), (the body or the fields we want to update in this case we are sending the fields for movie), (and the Http headers which specifies that the application is json and as such should be converted when the put requests executes to match this )
    tap(createdMovie => console.log(`createdMovie = ${JSON.stringify(createdMovie)}`)), //if retrieval is successful do this( create a variable and put the console to it)
    catchError(error => of(new Movie())), //if there is an error (returns an empty movie object)
    );
  }

  deleteMovie(id: number): Observable<Movie> {
    alert("The Movie " + this.deleteMovie.name + " has been removed");
    return this.http.delete<Movie>(`${this.rest_api}/${id}`, this.http_Header).pipe(
      tap( deletedMovie => console.log(`deletedMovie = ${JSON.stringify(deletedMovie)}`)), //if retrieval is successful
    ) ;
  }

  //implementing a search function
  searchMovies(searchBy:string, searchOpts:any): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.rest_api}?${searchBy}_like=${searchOpts}`).pipe( // for the search we have to give the url http:localhost:3000?(the question mark sign)the field we want to search addedwith " _like= " and the options by which we wish to search
      tap( searchResults => console.log(`searchResults = ${JSON.stringify(searchResults)}`)), //if retrieval is successful
      catchError(error => of([])), //if there is an error
     )
  }
}

