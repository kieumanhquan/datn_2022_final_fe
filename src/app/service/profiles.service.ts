import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Profiles} from '../models/model/Profiles';

@Injectable({
  providedIn: 'root',
})

export class ProfilesService{

  private apiServerUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  public update(profile: Profiles): Observable<any> {
    return this.http.post(`${this.apiServerUrl}`+'user/profiles',profile).pipe(
      tap(updateUser => console.log(`receivedJob=${JSON.stringify(updateUser)}`)),
    );
  }

  public getProfilesByUserId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}`+'user/profiles/id='+id).pipe(
      tap(receivedJob => console.log(`profile=${JSON.stringify(receivedJob)}`)),
    );
  }

  public checkProfile(profiles: Profiles){
    console.log(profiles);
    if(profiles === undefined ){
      return false;
    }
    if(profiles.id === undefined){
      return false;
    }
    if(profiles.skill === undefined){
      return false;
    }
    if(profiles.academicLevel === undefined){
      return false;
    }
    if (profiles.desiredSalary === undefined){
      return false;
    }
    if(profiles.desiredWorkingForm === undefined){
      return false;
    }
    if(profiles.desiredWorkingAddress === undefined){
      return false;
    }
    if(profiles.numberYearsExperience === undefined){
      return false;
    }
    return true;
  }
}
