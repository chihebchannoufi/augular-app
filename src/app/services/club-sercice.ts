import { Injectable } from '@angular/core';
import {Club } from '../models/club';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClubService {
  private readonly clubsUrl = 'http://localhost:8082/isi-clubs/clubs';

  constructor(private readonly http: HttpClient) {}

  getClubs(): Observable<Club[]> {
    return this.http.get<Club[]>(this.clubsUrl);
  }
}
