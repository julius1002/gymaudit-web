import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TrainingLogComponent } from "./components/training-log/training-log/training-log.component";
import { HomeComponent } from "./components/home/home.component";
import { LogExercisesComponent } from "./components/training-log/exercises/log-exercises/log-exercises.component";
import { LogUnitListComponent } from './components/training-log/units/log-unit-list/log-unit-list.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { RedirectComponent } from "./components/redirect/redirect.component";
import { UserinfoComponent } from "./components/userinfo/userinfo.component";
import { LogSetsComponent } from "./components/training-log/sets/log-sets/log-sets.component";
import { UserinfoFormComponent } from "./components/userinfo/userinfo-form/userinfo-form/userinfo-form.component";
import { UnsavedChangesGuard } from "./components/guards/unsaved-changes.guard";
import { SearchPageComponent } from "./components/social/search/search-page/search-page.component";
import { ProfileComponent } from "./components/social/profile/profile.component";

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
    canDeactivate: [UnsavedChangesGuard]
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
    path: "userinfo/edit",
    component: UserinfoFormComponent
  },
  {
    path: "social",
    component: SearchPageComponent
  },
  {
    path: "profile/:username",
    component: ProfileComponent
  },
  {
    path: "training-log",
    component: TrainingLogComponent,
    children: [
      {
        path: "units",
        component: LogUnitListComponent
      },
      {
        path: "units/:unitId",
        component: LogExercisesComponent
      },
      {
        path: "sets/:exerciseId",
        component: LogSetsComponent
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes
  )],
  exports: [RouterModule],
})
export class AppRoutingModule { }
