import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-student-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="page">
      <aside class="student-sidebar">
        <div class="brand text-center mb-4">
          <img src="assets/images/student_manager_logo.png" alt="Logo" class="img-fluid" />
        </div>

        <nav class="nav flex-column">
          <a routerLink="/students/add" routerLinkActive="active" class="nav-link btn btn-outline-primary mb-2">
            Add Student
          </a>
          <a routerLink="/students/manage" routerLinkActive="active" class="nav-link btn btn-outline-primary">
            Student Manager
          </a>
        </nav>
      </aside>

      <main class="student-main">
        <div class="student-content">
          <div class="student-page">
            <router-outlet />
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [
    `
      .page {
        display: flex;
        min-height: 100vh;
        background: #f6f7fb;
      }

      .student-sidebar {
        width: 280px;
        background: #ffffff;
        border-right: 1px solid #e6e8ef;
        padding: 24px;
        position: sticky;
        top: 0;
        height: 100vh;
      }

      .brand img {
        height: 110px; //sidebar logo image height
        width: auto;
      }

      .student-main {
        flex: 1;
        padding: 48px 24px;
        display: flex;
      }

      .student-content {
        width: 100%;
        display: flex;
        justify-content: center;
      }

      .student-page {
        width: 100%;
        //max width for student page
        max-width: var(--student-page-max-width, 1100px); 
        margin: 0 auto;
      }

      /* Give the content more room on common laptop widths */
      @media (max-width: 1400px) { // laptop width
        .student-sidebar { width: 220px; padding: 16px; }
        .student-main { padding: 24px 16px; }
      }

      /* Mobile: stack sidebar on top */
      @media (max-width: 768px) {
        .page { flex-direction: column; }
        .student-sidebar {
          width: 100%;
          height: auto;
          position: static;
          border-right: 0;
          border-bottom: 1px solid #e6e8ef;
        }
        .student-main { padding: 16px; }
      }

      .nav-link.active {
        background: #0d6efd;
        color: #fff;
        border-color: #0d6efd;
      }
    `,
  ],
})
export class StudentLayoutComponent {}
