import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnitsBarComponent } from './workout/units/units-bar.component';
import { ExerciseListComponent } from './workout/exercise-list/exercise-list.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'workout',
    pathMatch: 'full'
  },
  {
    path: 'home',
    redirectTo: ''
  },
  {
    path: 'units',
    component: UnitsBarComponent
  },
  {
    path: 'exercises/#',
    component: ExerciseListComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
