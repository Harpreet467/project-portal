import {Component, OnDestroy, OnInit} from '@angular/core';
import {Category, CategoryModel, ProjectModel, ProposalAuthorModel} from './proposal-author.model';
import {Subscription} from 'rxjs';
import {ProposalAuthorService} from './proposal-author.service';
import {SpinnerService} from '../shared/service/spinner.service';
import {MatSnackBar, MatStepper} from '@angular/material';
import {Router} from '@angular/router';
import {AppConfig} from '../app.config';


@Component({
  selector: 'app-proposal-author',
  templateUrl: './proposal-author.component.html',
  styleUrls: ['./proposal-author.component.scss']
})
export class ProposalAuthorComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  proposalAuthorModel: ProposalAuthorModel = new ProposalAuthorModel();
  projectModel: ProjectModel = new ProjectModel();
  categories: Category[];

  proposalAuthorStep = false;
  projectStep = false;

  constructor(
    private spinnerService: SpinnerService,
    private proposalAuthorService: ProposalAuthorService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.getProjectCategory();
  }

  getProjectCategory() {
    this.spinnerService.show();
    this.subscription.add(
      this.proposalAuthorService.getProjectCategory().subscribe((res: CategoryModel) => {
        this.categories = res.objects;
        this.spinnerService.hide();
      })
    );
  }

  saveProposalAuthor(stepper: MatStepper) {
    this.spinnerService.show();
    this.subscription.add(
      this.proposalAuthorService.createProposal(this.proposalAuthorModel).subscribe((res: ProposalAuthorModel) => {
        this.projectModel.proposal_author = res.id;
        this.proposalAuthorStep = true;
        this.spinnerService.hide();
        setTimeout(() => {
          stepper.next();
        }, 0);
      })
    );
  }

  saveProject(stepper: MatStepper) {
    this.spinnerService.show();
    this.subscription.add(
      this.proposalAuthorService.createProject(this.projectModel).subscribe(() => {
        this.projectStep = true;
        this.spinnerService.hide();
        setTimeout(() => {
          stepper.next();
        }, 0);
      })
    );
  }

  fileUpload() {
    this.snackBar.open('Successfully submitted');
    this.router.navigate([AppConfig.HOME]);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
