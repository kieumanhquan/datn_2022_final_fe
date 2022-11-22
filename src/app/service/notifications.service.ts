import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {

  private apiServerUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getNotifications(receiverId): Observable<any[]> {
    return this.http.get<any>(`${this.apiServerUrl}`+'user/notifications?receiverId='+receiverId).pipe(
      tap(notifications => console.log(`notifications=${JSON.stringify(notifications)}`)),
    );
  }
}
