import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ExerciseListComponent } from "./components/workout-plan/exercise-list/exercise-list.component";
import { UnitsBarComponent } from "./components/workout-plan/units/units-bar.component";
import { EditExerciseComponent } from "./components/workout-plan/edit-exercise/edit-exercise.component";
import { ExerciseDetailComponent } from "./components/workout-plan/exercise-detail/exercise-detail.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "units",
    pathMatch: "full",
  },
  {
    path: "home",
    redirectTo: "",
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
            outlet: "exercise-detail"
          },
          {
            path: "edit/:exerciseId",
            component: EditExerciseComponent,
            outlet: "exercise-detail"
          }
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
