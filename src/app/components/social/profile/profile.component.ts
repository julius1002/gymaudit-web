import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, switchMap, take, tap } from 'rxjs/operators';
import { Page } from 'src/app/model/page';
import { Unit } from 'src/app/model/unit';
import { SocialService } from 'src/app/services/social.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user$: Observable<any>;
  userName: string;

  unitsPage: Page<any>

  isLoading: boolean = false;

  pageSize: number = 8;

  index: number = 0;

  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      if (!this.unitsPage.last) {
        this.isLoading = true
        this.socialService.getUnitsOfUser(this.userName, this.pageSize, this.index += 1).subscribe((res: Page<Unit>) => {
          this.unitsPage.content = this.unitsPage.content.concat(res.content)
          this.unitsPage.last = res.last
          this.isLoading = false
        })
      }
    }
  }

  constructor(private socialService: SocialService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.user$ = this.route.paramMap.pipe(
      switchMap((paramMap) => this.socialService.getUserDetails(paramMap.get("username"))),
      tap(user => this.userName = user.username))

    this.route.paramMap.pipe(
      switchMap(paramMap => this.socialService.getUnitsOfUser(paramMap.get("username"), this.pageSize, this.index)))
      .subscribe(result => this.unitsPage = result)
  }
}
