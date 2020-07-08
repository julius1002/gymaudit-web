import { Injectable, Output, EventEmitter } from '@angular/core';
import { Set } from "../model/set";

@Injectable({
  providedIn: 'root'
})

export class LogSetServiceService {
  @Output() setList: EventEmitter<Set> = new EventEmitter();

  constructor() {}

  updateSetList(set:Set){
    this.setList.emit(set);
  }
}
