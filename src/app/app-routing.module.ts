import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ExerciseListComponent } from "./components/workout-plan/exercises/exercise-list/exercise-list.component";
import { UnitsBarComponent } from "./components/workout-plan/units/units-list/units-bar.component";
import { EditExerciseComponent } from "./components/workout-plan/exercises/edit-exercise/edit-exercise.component";
import { ExerciseDetailComponent } from "./components/workout-plan/exercises/exercise-detail/exercise-detail.component";
import { AddExerciseComponent } from "./components/workout-plan/exercises/add-exercise/add-exercise.component";
import { TrainingLogComponent } from './components/training-log/training-log/training-log.component';
import { HomeComponent } from './components/home/home/home.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "units",
    pathMatch: "full",
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "units",
    component: UnitsBarComponent,
    children: [
      {
        path: ":unitId",
        component: ExerciseListComponent,
        outlet: "exercises",
        children: [
          {
            path: "detail/:exerciseId",
            component: ExerciseDetailComponent,
            outlet: "exercise-detail",
          },
          {
            path: "edit/:exerciseId",
            component: EditExerciseComponent,
            outlet: "exercise-detail",
          },
          {
            path: "add",
            component: AddExerciseComponent,
            outlet: "exercise-detail",
          },
        ],
      },
    ],
  },
  {
    path: "training-log",
    component: TrainingLogComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
