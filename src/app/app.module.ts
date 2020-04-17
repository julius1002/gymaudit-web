import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UnitsBarComponent } from './components/workout-plan/units/units-bar.component';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { ExerciseDetailComponent } from './components/workout-plan/exercise-detail/exercise-detail.component';
import { ExerciseListComponent } from './components/workout-plan/exercise-list/exercise-list.component';

import localeDe from "@angular/common/locales/de";
import { registerLocaleData } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SetListComponent } from './components/workout-plan/set-list/set-list.component';
import { EditExerciseComponent } from './components/workout-plan/edit-exercise/edit-exercise.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [
    AppComponent,
    UnitsBarComponent,
    UnitsBarComponent,
    ExerciseDetailComponent,
    ExerciseListComponent,
    SetListComponent,
    EditExerciseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
    ],
  providers: [{ provide: LOCALE_ID, useValue: "de" }],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(){
    registerLocaleData(localeDe);
  }
}
