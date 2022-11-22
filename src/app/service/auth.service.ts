import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {User} from '../models/model/User';
import {Router} from '@angular/router';



const httpOptions = {
  headers: new HttpHeaders({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Content-Type': 'application/json',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Access-Control-Allow-Origin': '*',
  }),
};

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private apiServerUrl = environment.apiUrl;
  private readonly baseUrl = `${environment.apiUrl}auth/`;
  constructor(private http: HttpClient,private router: Router) {
  }
  public login(form: any): Observable<any> {
    return this.http.post(`${this.baseUrl}login`, form);
  }

  public addUser(user: User): Observable<any> {
    return this.http.post(`${this.apiServerUrl}`+'auth/register',user).pipe(
      tap(users => console.log(`users=${JSON.stringify(users)}`)),
    );
  }
  public addJeUser(user: User): Observable<any> {
    return this.http.post(`${this.apiServerUrl}`+'auth/registerJe',user).pipe(
      tap(users => console.log(`users=${JSON.stringify(users)}`)),
    );
  }

  public sendOtp(user: User): Observable<any> {
    return this.http.post(`${this.apiServerUrl}`+'auth/reset-password/init',user).pipe(
      tap(users => console.log(`users=${JSON.stringify(users)}`)),
    );
  }
  public changePassword(user: User,email: string): Observable<any> {
    return this.http.post(`${this.apiServerUrl}`+'auth/reset-password/finish?email='+email,user).pipe(
      tap(users => console.log(`users=${JSON.stringify(users)}`)),
    );
  }
}
