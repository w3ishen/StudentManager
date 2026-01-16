import { Injectable } from '@angular/core';
import { RestService } from '@abp/ng.core';
import type { CreateUpdateStudentDto, StudentDto } from './student.models';

export interface PagedResultDto<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class StudentApiService {
  private readonly apiName = 'Default';

  constructor(private readonly restService: RestService) {}

  getList(input?: { skipCount?: number; maxResultCount?: number; sorting?: string }) {
    return this.restService.request<any, PagedResultDto<StudentDto>>(
      {
        method: 'GET',
        url: '/api/app/student',
        params: input,
      },
      { apiName: this.apiName }
    );
  }

  update(id: number, input: CreateUpdateStudentDto) {
    return this.restService.request<CreateUpdateStudentDto, StudentDto>(
      {
        method: 'PUT',
        url: `/api/app/student/${id}`,
        body: input,
      },
      { apiName: this.apiName }
    );
  }

  delete(id: number) {
    return this.restService.request<any, void>(
      {
        method: 'DELETE',
        url: `/api/app/student/${id}`,
      },
      { apiName: this.apiName }
    );
  }

  create(input: CreateUpdateStudentDto) {
    return this.restService.request<CreateUpdateStudentDto, StudentDto>(
      {
        method: 'POST',
        url: '/api/app/student',
        body: input,
      },
      { apiName: this.apiName }
    );
  }
}
