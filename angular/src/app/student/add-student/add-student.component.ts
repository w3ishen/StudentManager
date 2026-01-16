import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToasterService } from '@abp/ng.theme.shared';
import { StudentApiService } from '../student-api.service';
import { StudyMode } from '../student.models';
import { BookComponent } from 'src/app/books/book.component';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BookComponent],
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.scss',
})
export class AddStudentComponent {

  readonly studyModes = [
    { value: StudyMode.PartTime, label: 'Part-time' },
    { value: StudyMode.FullTime, label: 'Full-time' },
  ];

  readonly countries = ['Malaysia', 'Singapore', 'Indonesia', 'China', 'India', 'Australia'];

  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(128)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(256)]],
    course: ['', [Validators.required, Validators.maxLength(128)]],
    studyMode: [null as StudyMode | null, [Validators.required]],
    countryOfOrigin: ['', [Validators.required, Validators.maxLength(128)]],
  });

  isSubmitting = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly studentApi: StudentApiService,
    private readonly toaster: ToasterService
  ) {}

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.studentApi.create(this.form.getRawValue()).subscribe({
      next: () => {
        this.toaster.success('Successfully Added');
        this.form.reset({
          name: '',
          email: '',
          course: '',
          studyMode: null,
          countryOfOrigin: '',
        });
        this.isSubmitting = false;
      },
      error: () => {
        this.isSubmitting = false;
      },
    });
  }
}
