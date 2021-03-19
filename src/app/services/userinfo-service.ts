import { Injectable} from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { UserInfo } from "../model/userInfo";

@Injectable({
  providedIn: "root",
})
export class UserInfoService {

    userInfo = new BehaviorSubject(undefined);
  constructor() {}

  setUserInfo(userinfo:UserInfo){
      this.userInfo.next(userinfo)
  }

  getUserinfo():Observable<UserInfo>{
      return this.userInfo.asObservable();
  }

}
