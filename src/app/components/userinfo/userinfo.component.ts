import { Component, OnInit } from '@angular/core';
import { UserinfoService } from 'src/app/services/userinfo.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.scss']
})
export class UserinfoComponent implements OnInit {

  userinfo;
  constructor(private userinfoService:UserinfoService) { }

  ngOnInit(): void {
    this.userinfoService.getUserInfo().subscribe(res =>this.userinfo = res)
   
  }

}
