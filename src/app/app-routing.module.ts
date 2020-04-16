import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExerciseListComponent } from './workout/exercise-list/exercise-list.component';
import { UnitsBarComponent } from './workout/units/units-bar.component';


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
    component: UnitsBarComponent,
    children: [
     { 
      path: ':id',
      component: ExerciseListComponent,
      outlet: 'exercises'
    }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
