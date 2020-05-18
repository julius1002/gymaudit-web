import { Component, OnInit, Input } from "@angular/core";
import { Exercise } from "src/app/model/exercise";
import { SetService } from 'src/app/services/set.service';
import { Page } from 'src/app/model/page';
import { Set } from 'src/app/model/set';
import { Observable } from 'rxjs';
@Component({
  selector: "app-log-sets",
  templateUrl: "./log-sets.component.html",
  styleUrls: ["./log-sets.component.scss"],
})
export class LogSetsComponent implements OnInit {
  @Input() exercise: Exercise;
  sets$:Observable<Page<Set>>;

  constructor(private setService:SetService) {}

  ngOnInit(): void {
    this.setService.getAll(this.exercise.unitId, this.exercise.id).subscribe(x=>console.log(x))
    if(this.exercise){
    this.sets$ = this.setService.getAll(this.exercise.unitId, this.exercise.id);
  }
  } 
}
