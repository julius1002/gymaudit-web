import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ExerciseListComponent } from "./components/workout-plan/exercises/exercise-list/exercise-list.component";
import { EditExerciseComponent } from "./components/workout-plan/exercises/edit-exercise/edit-exercise.component";
import { ExerciseDetailComponent } from "./components/workout-plan/exercises/exercise-detail/exercise-detail.component";
import { TrainingLogComponent } from "./components/training-log/training-log/training-log.component";
import { HomeComponent } from "./components/home/home.component";
import { LogExercisesComponent } from "./components/training-log/log-exercises/log-exercises.component";
import { LogUnitListComponent } from './components/training-log/log-unit-list/log-unit-list.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AboutComponent } from './components/about/about.component';
import { RedirectComponent } from "./components/redirect/redirect.component";
import { UserinfoComponent } from "./components/userinfo/userinfo.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "signup",
    component: SignupComponent,
  },
  {
    path: "redirect",
    component: RedirectComponent,
  },
  {
    path: "userinfo",
    component: UserinfoComponent,
  },
  {
    path: "training-log",
    component: TrainingLogComponent,
    children: [
      {
        path: ":units",
        component: LogUnitListComponent
      },
      {
        path: "units/:unitId",
        component: LogExercisesComponent
      },
    ],
  },
  {
    path: "about",
    component: AboutComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
