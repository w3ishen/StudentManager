import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToasterService } from '@abp/ng.theme.shared';
import { Subject, takeUntil } from 'rxjs';

import { StudentApiService } from '../student-api.service';
import { CreateUpdateStudentDto, StudentDto, StudyMode } from '../student.models';

@Component({
  selector: 'app-manage-students',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h1 class="title text-center mb-4">Student Manager</h1>

    <div class="card shadow-sm">
      <div class="card-body">
        <div class="d-flex align-items-center justify-content-between gap-2 mb-3 flex-wrap">
          <div class="text-muted">Total: {{ totalCount }}</div>
          <button class="btn btn-outline-secondary" type="button" (click)="reload()" [disabled]="isLoading">
            Refresh
          </button>
        </div>

        <div class="table-responsive">
          <table class="table table-bordered align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th style="width: 110px;">Student ID</th>
                <th style="min-width: 160px;">Name</th>
                <th style="min-width: 220px;">Email</th>
                <th style="min-width: 160px;">Course</th>
                <th style="min-width: 140px;">Study Mode</th>
                <th style="min-width: 170px;">Country of Origin</th>
                <th style="width: 170px;">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr *ngIf="isLoading">
                <td colspan="7" class="text-center py-4">Loading...</td>
              </tr>

              <tr *ngIf="!isLoading && students.length === 0">
                <td colspan="7" class="text-center py-4 text-muted">No students found.</td>
              </tr>

              <tr *ngFor="let s of students">
                <td>{{ s.id }}</td>
                <td class="fw-semibold">{{ s.name }}</td>
                <td>{{ s.email }}</td>
                <td>{{ s.course }}</td>
                <td>{{ studyModeLabel(s.studyMode) }}</td>
                <td>{{ s.countryOfOrigin }}</td>
                <td>
                  <div class="d-flex gap-2">
                    <button class="btn btn-primary btn-sm" type="button" (click)="openEdit(s)">Edit</button>
                    <button
                      class="btn btn-danger btn-sm"
                      type="button"
                      (click)="confirmDelete(s)"
                      [disabled]="isDeletingId === s.id"
                    >
                      {{ isDeletingId === s.id ? 'Deleting...' : 'Delete' }}
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="d-flex align-items-center justify-content-between mt-3 flex-wrap gap-2">
          <div class="text-muted">Page {{ page }} / {{ totalPages }}</div>
          <div class="btn-group" role="group" aria-label="Pagination">
            <button class="btn btn-outline-primary" type="button" (click)="prevPage()" [disabled]="page <= 1 || isLoading">
              Prev
            </button>
            <button class="btn btn-outline-primary" type="button" (click)="nextPage()" [disabled]="page >= totalPages || isLoading">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit modal (simple, no external JS dependency) -->
    <div class="modal-backdrop" *ngIf="isEditOpen" (click)="closeEdit()"></div>
    <div class="modal" *ngIf="isEditOpen" role="dialog" aria-modal="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Student</h5>
            <button type="button" class="btn-close" aria-label="Close" (click)="closeEdit()"></button>
          </div>

          <form [formGroup]="editForm" (ngSubmit)="saveEdit()">
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label">Student ID</label>
                <input class="form-control" [value]="editingStudent?.id" disabled />
              </div>

              <div class="mb-3">
                <label class="form-label">Name</label>
                <input class="form-control" formControlName="name" placeholder="Full name" />
              </div>

              <div class="mb-3">
                <label class="form-label">Email</label>
                <input class="form-control" formControlName="email" placeholder="name@email.com" />
              </div>

              <div class="mb-3">
                <label class="form-label">Course</label>
                <input class="form-control" formControlName="course" placeholder="Course" />
              </div>

              <div class="mb-3">
                <label class="form-label">Study Mode</label>
                <select class="form-select" formControlName="studyMode">
                  <option [ngValue]="StudyMode.PartTime">Part-time</option>
                  <option [ngValue]="StudyMode.FullTime">Full-time</option>
                </select>
              </div>

              <div class="mb-0">
                <label class="form-label">Country of Origin</label>
                <input class="form-control" formControlName="countryOfOrigin" placeholder="Country" />
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" (click)="closeEdit()" [disabled]="isSaving">
                Cancel
              </button>
              <button type="submit" class="btn btn-primary" [disabled]="editForm.invalid || isSaving">
                {{ isSaving ? 'Saving...' : 'Save' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .title { font-weight:700; }
      .card { width:100%; max-width:1100px; border-radius:14px; }

      .modal-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.45);
        z-index: 1040;
      }
      .modal {
        display: block;
        position: fixed;
        inset: 0;
        z-index: 1050;
        overflow: auto;
        padding: 24px;
      }
      .modal-dialog {
        max-width: 560px;
        margin: 48px auto;
      }
    `,
  ],
})
export class ManageStudentsComponent implements OnInit, OnDestroy {
  readonly StudyMode = StudyMode;

  students: StudentDto[] = [];
  totalCount = 0;
  page = 1;
  pageSize = 10;
  isLoading = false;
  isSaving = false;
  isDeletingId: number | null = null;

  isEditOpen = false;
  editingStudent: StudentDto | null = null;

  private readonly destroy$ = new Subject<void>();

  readonly editForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(128)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(256)]],
    course: ['', [Validators.required, Validators.maxLength(128)]],
    studyMode: [StudyMode.PartTime, [Validators.required]],
    countryOfOrigin: ['', [Validators.required, Validators.maxLength(128)]],
  });

  constructor(
    private readonly studentApi: StudentApiService,
    private readonly toaster: ToasterService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.load();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.totalCount / this.pageSize));
  }

  studyModeLabel(mode: StudyMode): string {
    return mode === StudyMode.FullTime ? 'Full-time' : 'Part-time';
  }

  reload(): void {
    this.load();
  }

  prevPage(): void {
    if (this.page <= 1) return;
    this.page -= 1;
    this.load();
  }

  nextPage(): void {
    if (this.page >= this.totalPages) return;
    this.page += 1;
    this.load();
  }

  private load(): void {
    this.isLoading = true;
    const skipCount = (this.page - 1) * this.pageSize;
    this.studentApi
      .getList({ skipCount, maxResultCount: this.pageSize, sorting: 'Id DESC' })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: result => {
          this.students = result.items ?? [];
          this.totalCount = result.totalCount ?? 0;

          const pages = this.totalPages;
          if (this.page > pages) {
            this.page = pages;
          }

          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        },
      });
  }

  openEdit(student: StudentDto): void {
    this.editingStudent = student;
    this.isEditOpen = true;
    this.editForm.reset({
      name: student.name,
      email: student.email,
      course: student.course,
      studyMode: student.studyMode,
      countryOfOrigin: student.countryOfOrigin,
    });
  }

  closeEdit(): void {
    if (this.isSaving) return;
    this.isEditOpen = false;
    this.editingStudent = null;
  }

  saveEdit(): void {
    if (!this.editingStudent) return;
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    const id = this.editingStudent.id;
    const input = this.editForm.getRawValue() as CreateUpdateStudentDto;

    this.isSaving = true;
    this.studentApi
      .update(id, input)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.toaster.success('Student updated');
          this.isSaving = false;
          this.closeEdit();
          this.load();
        },
        error: () => {
          this.isSaving = false;
        },
      });
  }

  confirmDelete(student: StudentDto): void {
    const ok = window.confirm(`Delete student #${student.id} (${student.name})?`);
    if (!ok) return;

    this.isDeletingId = student.id;
    this.studentApi
      .delete(student.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.toaster.success('Student deleted');
          this.isDeletingId = null;
          this.load();
        },
        error: () => {
          this.isDeletingId = null;
        },
      });
  }
}
