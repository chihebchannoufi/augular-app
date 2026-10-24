import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { ClubService } from '../../services/club-sercice';

@Component({
  selector: 'app-create-club',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-club.html',
  styleUrl: './create-club.css',
})
export class CreateClub {
  formModel = {
    name: '',
    description: '',
  };

  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private readonly clubService: ClubService,
    public readonly router: Router,
  ) {}

  submit(form: NgForm): void {
    if (form.invalid || this.isSubmitting) {
      form.control.markAllAsTouched();
      return;
    }

    const payload = {
      name: this.formModel.name.trim(),
      description: this.formModel.description.trim(),
    };

    if (!payload.name || !payload.description) {
      this.errorMessage = 'Name and description are required.';
      return;
    }

    this.successMessage = '';
    this.errorMessage = '';
    this.isSubmitting = true;

    this.clubService
      .createClub(payload)
      .pipe(
        finalize(() => {
          this.isSubmitting = false;
        }),
      )
      .subscribe({
        next: () => {
          this.successMessage = 'Club created successfully!';
          form.resetForm({
            name: '',
            description: '',
          });

          this.router.navigate(['/clubs']);
        },
        error: (error) => {
          console.error('Failed to create club:', error);
          this.errorMessage =
            error?.error?.message || 'Unable to create club. Please try again later.';
        },
      });
  }
}
