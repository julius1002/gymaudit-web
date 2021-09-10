import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-found-profile',
  templateUrl: './found-profile.component.html',
  styleUrls: ['./found-profile.component.scss']
})
export class FoundProfileComponent implements OnInit {

  @Input()
  user: any
  constructor() { }

  ngOnInit(): void {
  }

}
