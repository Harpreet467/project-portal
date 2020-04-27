import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProposalAuthor} from '../protected/proposal-author/proposal-author.model';
import {Subscription} from 'rxjs';
import {ProposalAuthorService} from '../protected/proposal-author/proposal-author.service';
import {SpinnerService} from '../shared/service/spinner.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import {Router} from '@angular/router';
import {AppConfig} from '../app.config';
import {toResponseBody, uploadProgress} from '../layout/file-upload/file-upload.utils';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {requiredFileType} from '../layout/file-upload/upload-file-validators';
import {AlertService} from '../layout/alert/alert.service';
import {Constant} from '../shared/constant';
import {Category, CategoryModel} from '../protected/category/category.model';
import {Project} from '../protected/project/project.model';
import {CategoryService} from '../protected/category/category.service';
import {Filter, FilterModel} from "../shared/model/filter.model";


@Component({
  selector: 'app-proposal-author',
  templateUrl: './project-proposal.component.html',
  styleUrls: ['./project-proposal.component.scss']
})
export class ProjectProposalComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  proposalAuthorModel: ProposalAuthor = new ProposalAuthor();
  project: Project = new Project();
  filterModel: FilterModel = new FilterModel();
  categories: Category[];

  progress = 0;
  proposalAuthorStep = false;
  projectStep = false;

  uploadFile = new FormGroup({
    file: new FormControl(null,
      [Validators.required, requiredFileType(Constant.UPLOAD_ALLOWED_FILE_FORMAT)]
    )
  });

  constructor(
    public spinnerService: SpinnerService,
    private proposalAuthorService: ProposalAuthorService,
    private categoryService: CategoryService,
    private alertService: AlertService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.filterModel.filters.push(new Filter(Constant.STATUS, Constant.EQ, true));
  }

  ngOnInit() {
    this.getProjectCategory();
  }

  getProjectCategory() {
    this.spinnerService.show();
    this.subscription.add(
      this.categoryService.getFilteredCategories(this.filterModel).subscribe((res: CategoryModel) => {
        this.categories = res.objects;
        this.spinnerService.hide();
      })
    );
  }

  saveProposalAuthor(stepper: MatStepper) {
    this.spinnerService.show();
    this.proposalAuthorStep = true;
    this.subscription.add(
      this.proposalAuthorService.createProposal(this.proposalAuthorModel).subscribe((res: ProposalAuthor) => {
        this.project.proposal_author = res.id;
        this.spinnerService.hide();
        stepper.next();
      }, () => {
        this.proposalAuthorStep = false;
        this.spinnerService.hide();
      })
    );
  }

  saveProject(stepper: MatStepper) {
    this.spinnerService.show();
    this.projectStep = true;
    this.subscription.add(
      this.proposalAuthorService.createProject(this.project).subscribe((res: Project) => {
        this.project.id = res.id;
        this.spinnerService.hide();
        stepper.next();
      }, () => {
        this.projectStep = false;
        this.spinnerService.hide();
      })
    );
  }

  fileUpload() {
    if (this.uploadFile.valid) {
      this.spinnerService.show();
      this.subscription.add(
        this.proposalAuthorService.uploadProjectFile(this.project.id, this.uploadFile.value)
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
      this.alertService.error('Only Supported file format are ' + Constant.UPLOAD_ALLOWED_FILE_FORMAT);
    } else {
      this.alertService.close();
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
