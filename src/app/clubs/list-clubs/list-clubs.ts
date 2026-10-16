import { Component, OnInit, signal } from '@angular/core';
import { Club } from '../../models/club';
import { ClubService } from '../../services/club-sercice';

@Component({
  selector: 'app-list-clubs',
  imports: [],
  templateUrl: './list-clubs.html',
  styleUrl: './list-clubs.css',
})
export class ListClubs implements OnInit {
  clubs = signal<Club[]>([]);
  isLoading = signal(true);
  errorMessage = signal('');

  constructor(private readonly clubService: ClubService) {}

  ngOnInit(): void {
    this.loadClubs();
  }

  private loadClubs(): void {
    this.clubService.getClubs().subscribe({
      next: (clubs) => {
        this.clubs.set(clubs ?? []);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Failed to load clubs...', error);
        this.errorMessage.set('Unable to load clubs...');
        this.isLoading.set(false);
      },
    });
  }
}
