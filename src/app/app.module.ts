import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WorkoutComponent } from './workout/workout.component';
import { UnitsBarComponent } from './workout/units/units-bar.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule } from '@angular/common/http';
import { ExerciseDetailComponent } from './workout/exercise-detail/exercise-detail.component';
import { ExerciseListComponent } from './workout/exercise-list/exercise-list.component';

import localeDe from "@angular/common/locales/de";
import { registerLocaleData } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SetListComponent } from './workout/set-list/set-list.component';

@NgModule({
  declarations: [
    AppComponent,
    WorkoutComponent,
    UnitsBarComponent,
    ExerciseDetailComponent,
    ExerciseListComponent,
    SetListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    NgbModule,
    HttpClientModule,
    FontAwesomeModule
    ],
  providers: [{ provide: LOCALE_ID, useValue: "de" }],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(){
    registerLocaleData(localeDe);
  }
}
