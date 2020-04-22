import { Injectable, Output, EventEmitter } from '@angular/core';
import { Unit } from '../model/unit';

@Injectable({
  providedIn: 'root'
})
export class UnitListService {

  @Output() unitList: EventEmitter<Unit> = new EventEmitter();

  constructor() {}

  updateListEvent() {
    this.unitList.emit();
  }
}
