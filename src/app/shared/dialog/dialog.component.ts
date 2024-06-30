import { Component, Inject, OnInit } from '@angular/core';
import { MatError, MatFormFieldModule} from '@angular/material/form-field';

import {MatDialogModule, MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,} from '@angular/material/dialog';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgToastModule } from 'ng-angular-popup';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { singleLanguageValidator } from '../validators/singleLanguageValidators';
import { CommonModule } from '@angular/common';
import { JobService } from '../../core/services/job.service';
import { IPosition } from '../../core/interfaces/position.interface';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
  MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatFormFieldModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    NgToastModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent implements OnInit{
  get positionName() {
    return this.form.controls['positionName'];
  }
  get positionLevel() {
    return this.form.controls['positionLevel'];
  }
  get description() {
    return this.form.controls['description'];
  }
  get dateFrom() {
    return this.form.controls['dateFrom'];
  }
  get dateTo() {
    return this.form.controls['dateTo'];
  }

  job:any

  constructor(
    private jobService: JobService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.jobService.getEachJob(this.data.id)
      .subscribe( res => {
        this.job = res
    })
  }

  form: FormGroup = new FormGroup({
    positionName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      singleLanguageValidator(),
      Validators.pattern(/^\S+$/),
    ]),
    positionLevel: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      singleLanguageValidator(),
      Validators.pattern(/^\S+$/),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(300),
      singleLanguageValidator(),
      Validators.pattern(/^\S+$/),
    ]),
    dateFrom: new FormControl('',[
      Validators.required
    ]),
    dateTo: new FormControl('',[
      Validators.required
    ])


  });

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.job.positions.push(this.form.value as IPosition);
      this.jobService.editJob(this.data.id, this.job).subscribe(() => {
        this.dialogRef.close(this.form.value);
      });
    }
  }
}
