import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UnitsBarComponent } from './components/workout-plan/units/units-list/units-bar.component';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { ExerciseDetailComponent } from './components/workout-plan/exercises/exercise-detail/exercise-detail.component';
import { ExerciseListComponent } from './components/workout-plan/exercises/exercise-list/exercise-list.component';

import localeDe from "@angular/common/locales/de";
import { registerLocaleData } from '@angular/common';
import { SetListComponent } from './components/workout-plan/exercises/exercise-detail/set-list/set-list.component';
import { EditExerciseComponent } from './components/workout-plan/exercises/edit-exercise/edit-exercise.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatSidenavModule} from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExerciseFormComponent } from './components/workout-plan/exercises/exercise-form/exercise-form.component';
import { AddExerciseComponent } from './components/workout-plan/exercises/add-exercise/add-exercise.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { ReactiveFormsModule} from '@angular/forms';
import { UnitFormComponent } from './components/workout-plan/units/unit-form/unit-form.component';
import { AddUnitComponent } from './components/workout-plan/units/add-unit/add-unit.component';
import { EditUnitComponent } from './components/workout-plan/units/edit-unit/edit-unit.component' 
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import { MusclegroupViewComponent } from './components/workout-plan/exercises/exercise-detail/musclegroup-view/musclegroup-view.component';

@NgModule({
  declarations: [
    AppComponent,
    UnitsBarComponent,
    UnitsBarComponent,
    ExerciseDetailComponent,
    ExerciseListComponent,
    SetListComponent,
    EditExerciseComponent,
    ExerciseFormComponent,
    AddExerciseComponent,
    UnitFormComponent,
    AddUnitComponent,
    EditUnitComponent,
    MusclegroupViewComponent
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
    MatCardModule
    ],
  providers: [{ provide: LOCALE_ID, useValue: "de" }],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(){
    registerLocaleData(localeDe);
  }
}
