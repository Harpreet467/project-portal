import {Component, OnDestroy, OnInit} from '@angular/core';
import {Category, CategoryModel, ProjectModel, ProposalAuthorModel} from './proposal-author.model';
import {Subscription} from 'rxjs';
import {ProposalAuthorService} from './proposal-author.service';
import {SpinnerService} from '../shared/service/spinner.service';
import {MatSnackBar, MatStepper} from '@angular/material';
import {Router} from '@angular/router';
import {AppConfig} from '../app.config';
import {toResponseBody, uploadProgress} from '../layout/file-upload/file-upload.utils';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {requiredFileType} from '../layout/file-upload/upload-file-validators';
import {AlertService} from '../layout/alert/alert.service';


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

  progress = 0;
  proposalAuthorStep = false;
  projectStep = false;

  uploadFile = new FormGroup({
    file: new FormControl(null, [Validators.required, requiredFileType('png')])
  });

  constructor(
    private spinnerService: SpinnerService,
    private proposalAuthorService: ProposalAuthorService,
    private alertService: AlertService,
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
      this.proposalAuthorService.createProject(this.projectModel).subscribe((res: ProjectModel) => {
        this.projectModel.id = res.id;
        this.projectStep = true;
        this.spinnerService.hide();
        setTimeout(() => {
          stepper.next();
        }, 0);
      })
    );
  }

  fileUpload() {
    if (this.uploadFile.valid) {
      this.spinnerService.show();
      this.subscription.add(
        this.proposalAuthorService.uploadProjectFile(this.projectModel.id, this.uploadFile.value)
          .pipe(
            uploadProgress(progress => (this.progress = progress)),
            toResponseBody()
          )
          .subscribe(() => {
            this.progress = 0;
            this.spinnerService.hide();
            this.successFn();
          })
      );
    } else {
      this.successFn();
    }
  }

  hasError(field: string, error: string) {
    const control = this.uploadFile.get(field);
    const isError = control.dirty && control.hasError(error);
    if (isError) {
      this.alertService.error('Only Supported file format.');
    }
    return isError;
  }

  successFn() {
    this.snackBar.open('Successfully submitted');
    this.router.navigate([AppConfig.HOME]);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
