import {Component, OnDestroy, OnInit} from '@angular/core';
import {Category, CategoryModel, ProjectModel, ProposalAuthorModel} from './proposal-author.model';
import {Subscription} from 'rxjs';
import {ProposalAuthorService} from './proposal-author.service';
import {SpinnerService} from '../shared/service/spinner.service';


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
    private proposalAuthorService: ProposalAuthorService
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

  saveProposalAuthor() {
    this.proposalAuthorStep = true;
    this.subscription.add(
      this.proposalAuthorService.createProposal(this.proposalAuthorModel).subscribe((res: ProposalAuthorModel) => {
        this.projectModel.proposal_author = res.id;
      })
    );
  }

  saveProject() {
    this.projectStep = true;
    this.subscription.add(
      this.proposalAuthorService.createProject(this.projectModel).subscribe(() => {
      })
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
