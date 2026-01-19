import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RestService } from '@abp/ng.core';
import { ToasterService } from '@abp/ng.theme.shared';
import { Subject, takeUntil } from 'rxjs';

type BookDto = {
  id: number;
  title: string;
  author: string;
};

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit, OnDestroy {
  books: BookDto[] = [];
  totalCount = 0;
  isLoading = false;
  isSaving = false;
  isDeletingId: number | null = null;

  // modal state
  isAddOpen = false;
  isEditOpen = false;
  editingBook: BookDto | null = null;

  private readonly destroy$ = new Subject<void>();

  private readonly api = {
  base: '/api/app/book',   // CrudAppService base endpoint
};

  readonly addForm = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(128)]],
    author: ['', [Validators.required, Validators.maxLength(256)]],
  });

  readonly editForm = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(128)]],
    author: ['', [Validators.required, Validators.maxLength(256)]],
  });

  // Constructor, dependency injection
  constructor(
    private readonly rest: RestService,
    private readonly toaster: ToasterService,
    private readonly fb: FormBuilder
  ) {}
  // Component startup
  ngOnInit(): void {
    this.load();
  }
  // The use ngOnDestroy:
  // -Cancelled all pending requests
  // -Component cleans itself up
  // -Professional-grade lifecycle handling
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Eg.: "Showing 1 to 3 of 3 entries"
  get entriesText(): string {
    const total = this.totalCount || this.books.length; // If totalCount exists (from API paging), use it
    if (this.isLoading) return 'Loading...';
    if (total === 0) return 'Showing 0 to 0 of 0 entries';
    return `Showing 1 to ${Math.min(this.books.length, total)} of ${total} entries`;
  }

  load(): void {
  this.isLoading = true;

  // Every time you do:
  // this.rest.request(...).subscribe(...)
  // Angular opens a subscription.
  // If you navigate away from the page and the component is destroyed, 
  // that subscription may still be alive unless you explicitly stop it.

  // Using takeUntil(this.destroy$) + ngOnDestroy() unsubscribes all active
  // subscriptions for this component, preventing "ghost" callbacks.

  // Read method (GET)
  this.rest
    .request<any, any>(
      {
        method: 'GET',
        url: this.api.base,
        params: { skipCount: 0, maxResultCount: 1000 },
      },
      { apiName: 'Default' }
    )
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (res) => {
        this.books = (res.items ?? []).map((b: any) => ({
          id: b.id,
          title: b.title,
          author: b.author,
        }));
        this.totalCount = res.totalCount ?? this.books.length;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
}
  // Open, close, save add form
  openAdd(): void {
    this.isAddOpen = true;
    this.addForm.reset({ title: '', author: '' });
  }

  closeAdd(): void {
    if (this.isSaving) return;
    this.isAddOpen = false;
  }

  saveAdd(): void {
    if (this.addForm.invalid) {
      this.addForm.markAllAsTouched();
      return;
    }

    const input = this.addForm.getRawValue() as { title: string; author: string };
    this.isSaving = true;

    // Add method (POST)
    this.rest.request<any, any>(
  {
    method: 'POST',
    url: this.api.base,
    body: input,
  },
  { apiName: 'Default' }
)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.toaster.success('Book added');
          this.isSaving = false;
          this.closeAdd();
          this.load();
        },
        error: () => (this.isSaving = false),
      });
  }

  // Open, close, save edit form
  openEdit(book: BookDto): void {
    this.editingBook = book;
    this.isEditOpen = true;
    this.editForm.reset({ title: book.title, author: book.author });
  }

  closeEdit(): void {
    if (this.isSaving) return;
    this.isEditOpen = false;
    this.editingBook = null;
  }

  saveEdit(): void {
    if (!this.editingBook) return;

    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    const id = this.editingBook.id;
    const input = this.editForm.getRawValue() as { title: string; author: string };

    this.isSaving = true;

    // Update method (PUT)
    this.rest.request<any, any>(
  {
    method: 'PUT',
    url: `${this.api.base}/${id}`,
    body: input,
  },
  { apiName: 'Default' }
)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.toaster.success('Book updated');
          this.isSaving = false;
          this.closeEdit();
          this.load();
        },
        error: () => (this.isSaving = false),
      });
  }

  // Delete method (DELETE)
  confirmDelete(book: BookDto): void {
    const ok = window.confirm('confirm deletion');
    if (!ok) return;

    this.isDeletingId = book.id;

    this.rest.request<any, any>(
  {
    method: 'DELETE',
    url: `${this.api.base}/${book.id}`,
  },
  { apiName: 'Default' }
)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.toaster.success('Book deleted');
          this.isDeletingId = null;
          this.load();
        },
        error: () => (this.isDeletingId = null),
      });
  }

  add(): void {
    this.openAdd();
  }
}