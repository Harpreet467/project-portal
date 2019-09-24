import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {
  visibility: BehaviorSubject<boolean>;

  constructor() {
    this.visibility = new BehaviorSubject(false);
  }

  show() {
    setTimeout(() => {
      this.visibility.next(true);
    }, 0);
  }

  hide() {
    setTimeout(() => {
      this.visibility.next(false);
    }, 0);
  }

}
