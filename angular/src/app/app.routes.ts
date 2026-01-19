import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./home/home.routes').then(m => m.homeRoutes),
  },
  {
    path: 'students',
    loadComponent: () =>
      import('./student/student-layout/student-layout.component.js').then(
        m => m.StudentLayoutComponent
      ),
    children: [
      {
        path: 'add',
        loadComponent: () =>
          import('./student/add-student/add-student.component.js').then(
            m => m.AddStudentComponent
          ),
      },
      {
        path: 'manage',
        loadComponent: () =>
          import('./student/manage-students/manage-students.component.js').then(
            m => m.ManageStudentsComponent
          ),
      },
      // Book manager shares sidebar/layout
    { path: 'books/manage', 
      loadComponent: () => import('./books/book.component').then(
        m => m.BookComponent
      ) 
    },

    
      { path: '', pathMatch: 'full', redirectTo: 'manage' },
    ],
  },
  

  // ABP built-in modules
  {
    path: 'account',
    loadChildren: () => import('@abp/ng.account').then(m => m.createRoutes()),
  },
  {
    path: 'identity',
    loadChildren: () => import('@abp/ng.identity').then(m => m.createRoutes()),
  },
  {
    path: 'tenant-management',
    loadChildren: () =>
      import('@abp/ng.tenant-management').then(m => m.createRoutes()),
  },
  {
    path: 'setting-management',
    loadChildren: () =>
      import('@abp/ng.setting-management').then(m => m.createRoutes()),
  },
];
