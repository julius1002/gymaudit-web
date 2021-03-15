import { Injectable} from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ImageService {

    imageUri = new BehaviorSubject("");
  constructor() {}

  setImageUri(uri:string){
      this.imageUri.next(uri)
  }

  getImageUri(){
      return this.imageUri.asObservable();
  }

}
