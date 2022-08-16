import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {path:'', redirectTo: '/home', pathMatch: 'full'}, //of user accesses teh root folder which is the local host for the port we will redirect them to the dashboard
  {path:'home', component: HomeComponent},
  {path:'addMovie', component: AddMovieComponent},
  {path: 'detail/:id', component:UpdateComponent},
  {path: 'search', component:SearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
