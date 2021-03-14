import { NgModule, LOCALE_ID } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { UnitsBarComponent } from "./components/workout-plan/units/units-list/units-bar.component";
import { BrowserModule } from "@angular/platform-browser";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ExerciseDetailComponent } from "./components/workout-plan/exercises/exercise-detail/exercise-detail.component";
import { ExerciseListComponent } from "./components/workout-plan/exercises/exercise-list/exercise-list.component";

import localeDe from "@angular/common/locales/de";
import { registerLocaleData } from "@angular/common";
import { EditExerciseComponent } from "./components/workout-plan/exercises/edit-exercise/edit-exercise.component";

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatSidenavModule } from "@angular/material/sidenav";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ExerciseFormComponent } from "./components/training-log/exercise-form/exercise-form.component";
import { AddExerciseComponent } from "./components/training-log/add-exercise/add-exercise.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTabsModule } from "@angular/material/tabs";

import { ReactiveFormsModule } from "@angular/forms";
import { UnitFormComponent } from "./components/workout-plan/units/unit-form/unit-form.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatCardModule } from "@angular/material/card";
import { MusclegroupViewComponent } from "./components/workout-plan/exercises/exercise-detail/musclegroup-view/musclegroup-view.component";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatChipsModule } from "@angular/material/chips";
import { TrainingLogComponent } from "./components/training-log/training-log/training-log.component";
import { AddUnitDialogComponent } from "./components/workout-plan/units/add-unit-dialog/add-unit-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { EditUnitDialogComponent } from "./components/workout-plan/units/edit-unit-dialog/edit-unit-dialog.component";
import { HomeComponent } from "./components/home/home.component";
import { LogSetsComponent } from './components/training-log/log-sets/log-sets.component';
import { LogExercisesComponent } from './components/training-log/log-exercises/log-exercises.component';
import { LogUnitListComponent } from './components/training-log/log-unit-list/log-unit-list.component';
import { LogSetsFormComponent } from './components/training-log/log-sets-form/log-sets-form.component';
import { AddSetComponent } from './components/training-log/add-set/add-set.component';
import {MatTableModule} from '@angular/material/table';
import { SetTableComponent } from './components/training-log/log-sets/set-table/set-table.component';
import {EditSetComponent} from './components/training-log/edit-set/edit-set.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AboutComponent } from './components/about/about.component';
import { HttpRequestInterceptor } from "./interceptors/httprequestinterceptor";

@NgModule({
  declarations: [
    AppComponent,
    UnitsBarComponent,
    UnitsBarComponent,
    ExerciseDetailComponent,
    ExerciseListComponent,
    EditExerciseComponent,
    ExerciseFormComponent,
    AddExerciseComponent,
    UnitFormComponent,
    MusclegroupViewComponent,
    TrainingLogComponent,
    AddUnitDialogComponent,
    EditUnitDialogComponent,
    HomeComponent,
    LogSetsComponent,
    LogExercisesComponent,
    LogUnitListComponent,
    LogSetsFormComponent,
    AddSetComponent,
    SetTableComponent,
    EditSetComponent,
    LoginComponent,
    SignupComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    FlexLayoutModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatCardModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatTabsModule,
    MatChipsModule,
    MatDialogModule,
    MatTableModule,
    MatButtonToggleModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: "de" },
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }
],

  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    registerLocaleData(localeDe);
  }
}
