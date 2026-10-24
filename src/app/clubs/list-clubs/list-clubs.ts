import { Component, OnInit, signal } from '@angular/core';
import { Club } from '../../models/club';
import { ClubService } from '../../services/club-sercice';

@Component({
  selector: 'app-list-clubs',
  standalone: true,
  imports: [],
  templateUrl: './list-clubs.html',
  styleUrl: './list-clubs.css',
})
export class ListClubs implements OnInit {
  clubs = signal<Club[]>([]);
  isLoading = signal(true);
  errorMessage = signal('');
  deletingClubId = signal<number | null>(null);

  constructor(private readonly clubService: ClubService) {}

  ngOnInit(): void {
    this.loadClubs();
  }

  private loadClubs(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.clubService.getClubs().subscribe({
      next: (clubs) => {
        this.clubs.set(clubs ?? []);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Failed to load clubs:', error);
        this.errorMessage.set('Unable to load clubs. Please try again later.');
        this.isLoading.set(false);
      },
    });
  }

  deleteClub(club: Club): void {
    if (club.id == null) {
      return;
    }

    const clubId = club.id;

    this.errorMessage.set('');
    this.deletingClubId.set(clubId);

    this.clubService.deleteClub(clubId).subscribe({
      next: () => {
        this.clubs.update((items) =>
          items.filter((item) => item.id !== clubId)
        );

        this.deletingClubId.set(null);
      },
      error: (error) => {
        console.error('Failed to delete club:', error);
        this.errorMessage.set(
          'Unable to delete club. Please try again later.'
        );
        this.deletingClubId.set(null);
      },
    });
  }
}
