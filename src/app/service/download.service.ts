import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DownloadFileService {
  private apiPublicUrl = environment.apiPublicUrl;

  constructor(private http: HttpClient) { }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public formData = new FormData();



  public getAvatar(fileName: string): Observable<any> {
    this.resetForm();
    return this.http.get(`${this.apiPublicUrl}`+'files/'+ fileName).pipe(
      tap(receivedJob => console.log(`receivedJob=${JSON.stringify(receivedJob)}`)),
    );
  }

  resetForm() {
    this.formData = new FormData();
  }
}
