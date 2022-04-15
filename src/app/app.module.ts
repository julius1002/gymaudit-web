import { registerLocaleData } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import localeDe from "@angular/common/locales/de";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from "@angular/material/card";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from "@angular/material/dialog";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from './components/login/login.component';
import { RedirectComponent } from './components/redirect/redirect.component';
import { SignupComponent } from './components/signup/signup.component';
import { SearchPageComponent } from './components/social/search/search-page/search-page.component';
import { AddExerciseComponent } from "./components/training-log/exercises/add-exercise/add-exercise.component";
import { EditExerciseComponent } from "./components/training-log/exercises/edit-exercise/edit-exercise.component";
import { ExerciseFormComponent } from "./components/training-log/exercises/exercise-form/exercise-form.component";
import { LogExercisesComponent } from './components/training-log/exercises/log-exercises/log-exercises.component';
import { FileUploadComponent } from './components/training-log/file-upload/file-upload.component';
import { SearchComponent } from './components/training-log/search/search.component';
import { AddSetComponent } from './components/training-log/sets/add-set/add-set.component';
import { EditSetComponent } from './components/training-log/sets/edit-set/edit-set.component';
import { LogSetsFormComponent } from './components/training-log/sets/log-sets-form/log-sets-form.component';
import { LogSetsComponent } from './components/training-log/sets/log-sets/log-sets.component';
import { MuscleGroupComponent } from './components/training-log/sets/muscle-group/muscle-group.component';
import { TrainingLogComponent } from "./components/training-log/training-log/training-log.component";
import { AddUnitDialogComponent } from "./components/training-log/units/add-unit-dialog/add-unit-dialog.component";
import { EditUnitComponent } from './components/training-log/units/edit-unit/edit-unit.component';
import { LogUnitListComponent } from './components/training-log/units/log-unit-list/log-unit-list.component';
import { UnitFormComponent } from "./components/training-log/units/unit-form/unit-form.component";
import { UserinfoFormComponent } from './components/userinfo/userinfo-form/userinfo-form/userinfo-form.component';
import { UserinfoComponent } from './components/userinfo/userinfo.component';
import { HttpRequestInterceptor } from "./interceptors/httprequestinterceptor";
import { AgoPipe } from './pipes/ago.pipe';
import { FoundProfileComponent } from './components/social/search/found-profile/found-profile/found-profile.component';
import { ProfileComponent } from './components/social/profile/profile.component';
import { ProfileUnitComponent } from './components/social/profile/profile-unit/profile-unit.component';
import { ProfileExerciseComponent } from './components/social/profile/profile-unit/profile-exercise/profile-exercise.component';
import { TimerComponent } from "./components/timer/timer.component";

@NgModule({
  declarations: [
    AppComponent,
    EditExerciseComponent,
    ExerciseFormComponent,
    AddExerciseComponent,
    UnitFormComponent,
    TrainingLogComponent,
    AddUnitDialogComponent,
    HomeComponent,
    LogSetsComponent,
    LogExercisesComponent,
    LogUnitListComponent,
    LogSetsFormComponent,
    AddSetComponent,
    EditSetComponent,
    LoginComponent,
    SignupComponent,
    RedirectComponent,
    UserinfoComponent,
    EditUnitComponent,
    FileUploadComponent,
    AgoPipe,
    HeaderComponent,
    UserinfoFormComponent,
    FooterComponent,
    MuscleGroupComponent,
    SearchComponent,
    SearchPageComponent,
    FoundProfileComponent,
    ProfileComponent,
    ProfileUnitComponent,
    ProfileExerciseComponent,
    TimerComponent],
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
    MatDialogModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }



  ],

  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    registerLocaleData(localeDe);
  }
}
