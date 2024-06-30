import { Component, OnDestroy, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatError, MatFormFieldModule} from '@angular/material/form-field';
import {FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card'
import { singleLanguageValidator } from '../../shared/validators/singleLanguageValidators';
import { CommonModule } from '@angular/common';
import { Observable, Subject, takeUntil } from 'rxjs';
import { JobService } from '../../core/services/job.service';
import { HttpClientModule } from '@angular/common/http';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import {MatDialogModule, MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,} from '@angular/material/dialog';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { IJob } from '../../core/interfaces/job.interface';

@Component({
  selector: 'app-task-1',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    NgToastModule,
    MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDatepickerModule,
    MatNativeDateModule,
],
  templateUrl: './task-1.component.html',
  styleUrl: './task-1.component.scss',
})
export class Task1Component implements OnDestroy, OnInit{
  mySub$ = new Subject();
  getAllJob$: Observable<IJob[]> = this.jobService.getJobs()
  position:any

  get companyName() {
    return this.form.controls['companyName'];
  }
  get companyWebPage() {
    return this.form.controls['companyWebPage'];
  }
  get description() {
    return this.form.controls['description'];
  }
  get positions() {
    return this.form.controls['positions'] as FormArray;
  }
  constructor(
    private jobService: JobService,
    private ngToastService: NgToastService,
    public dialog: MatDialog
  ){}
  ngOnInit(): void {
    this.getAllJob()
  }

  form: FormGroup = new FormGroup({
    companyName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      singleLanguageValidator(),
     
    ]),
    companyWebPage: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
            singleLanguageValidator(),


    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(20),
      singleLanguageValidator(),
    ]),
    positions: new FormArray([]),

  });

  getAllJob(){
    this.jobService.getJobs().subscribe()
  }

  submit(){

    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.jobService.addJob(this.form.value)
      .pipe(takeUntil(this.mySub$))
      .subscribe({
        next: () => {
          this.ngToastService.success('Job added successfully','Success Messege', 5000)
          this.getAllJob$ = this.jobService.getJobs()
          this.form.reset()
        },
        error: () => {this.ngToastService.danger('Jobn added unsuccessfully','Error Messege', 5000)},

     });
  }else{
   this.ngToastService.danger('Invalid Form','Error Messege', 5000)
  }


}
resetForm() {
  this.form.reset({
    companyName: '',
    companyWebPage: '',
    description: ''
  });
  Object.keys(this.form.controls).forEach(key => {
    this.form.get(key)?.setErrors(null);
  });
}
deleteJob(id: number){
  this.jobService.deleteJob(id).subscribe({
    next: () => {
    this.ngToastService.success('Job deleted successfully','Success Messege', 5000)
    this.getAllJob$ = this.jobService.getJobs()
  },
    error: () => {this.ngToastService.danger('Jobn deleted unsuccessfully','Error Messege', 5000)},
   })


}
deletePosition(jobId: number, positionIndex: number): void {
  this.jobService.getEachJob(jobId).subscribe((job) => {
    job.positions.splice(positionIndex, 1);
    this.jobService.editJob(jobId, job).subscribe({
      next: () => {
        this.ngToastService.success('Position deleted successfully', 'Success Message', 5000);
        this.getAllJob$ = this.jobService.getJobs();
      },
      error: () => {
        this.ngToastService.danger('Position deletion unsuccessful', 'Error Message', 5000);
      },
    });
  });
}
addPosition(id: number): void {
  const dialogRef = this.dialog.open(DialogComponent, {
    width: '300px',
    data: { positions: this.positions, id: id }
  });
  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      this.getAllJob$ = this.jobService.getJobs();
    }
  });
}


ngOnDestroy(): void {
  this.mySub$.next(null), this.mySub$.complete();
}
}
