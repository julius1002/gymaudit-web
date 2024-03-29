import { Injectable, Output, EventEmitter } from "@angular/core";
import { Unit } from "../model/unit";

@Injectable({
  providedIn: "root",
})
export class UnitListService {
  @Output() unitList: EventEmitter<Unit> = new EventEmitter();

  @Output() unitRemoved: EventEmitter<Unit> = new EventEmitter();
  constructor() {}

  updateListEvent(unit:Unit) {
    this.unitList.emit(unit);
  }

  unitRemovedEvent() {
    this.unitRemoved.emit();
  }
}
