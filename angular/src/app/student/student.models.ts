export enum StudyMode {
  PartTime = 0,
  FullTime = 1,
}

export interface CreateUpdateStudentDto {
  name: string;
  email: string;
  course: string;
  studyMode: StudyMode;
  countryOfOrigin: string;
}

export interface StudentDto extends CreateUpdateStudentDto {
  id: number;
  creationTime?: string;
}
