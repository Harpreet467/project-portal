import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {SharedService} from './shared/service/shared.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  mobileQuery: MediaQueryList;
  isOpen = false;

  private readonly mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private sharedService: SharedService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnInit(): void {
    this.sharedService.checkLoggedIn();
    this.subscription.add(
      this.sharedService.isUserLoggedIn.subscribe(value => {
        this.isOpen = value;
      })
    );
  }

  toggleSideNav() {
    this.isOpen = !this.isOpen;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
