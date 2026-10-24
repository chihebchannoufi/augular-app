import { Injectable } from '@angular/core';
import {Club } from '../models/club';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClubService {
  private readonly clubsUrl = 'http://localhost:8082/isi-clubs/clubs';
  private readonly createClubApiUrl = `${this.clubsUrl}/create`;

  constructor(private readonly http: HttpClient) {}

  getClubs(): Observable<Club[]> {
    return this.http.get<Club[]>(this.clubsUrl);
  }

  deleteClub(id: number): Observable<void>{
    const params = new HttpParams().set('id', id);
    return  this.http.delete<void >(this.clubsUrl ,{params});
  }
  createClub(club : Pick<Club,'name' | 'description'>): Observable<unknown>{
    return this.http.post(this.createClubApiUrl, club);
  }
}
