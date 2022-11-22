import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../models/model/User';
import {SessionService} from '../../../@core/services/session.service';
import {ProfileService} from '../../home/profile/profile.service';
import {PrimeNGConfig} from 'primeng/api';
import {UserService} from '../../../service/user.service';
import {HttpErrorResponse} from '@angular/common/http';
import { Profiles } from '../../../models/model/Profiles';
import {AcademicLevel} from '../../../models/model/AcademicLevel';
import {UploadFileService} from '../../../service/upload.service';
import {DomSanitizer} from '@angular/platform-browser';
import { DownloadFileService } from '../../../service/download.service';
import {environment} from '../../../../environments/environment';
import {Router} from '@angular/router';


@Component({
  selector: 'ngx-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  avatarUrl: string;
  formUser: FormGroup;
  user: User;
  username: string;
  profiles: Profiles ;
  academicLevels: AcademicLevel[];
  birthday: string;
  fileAvatar: File;
  avatar: string;

  constructor(
    private sessionService: SessionService,
    private profileService: ProfileService,
    private fb: FormBuilder,
    private primengConfig: PrimeNGConfig,
    private userService: UserService,
    private  uploadService: UploadFileService,
    private sanitizer: DomSanitizer,
    private  downloadService: DownloadFileService,
    private  router: Router) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getAllAcademicLevel();
    this.getUser();
    console.log('user form: '+ this.user);
  }
  initForm(){
    const birthday = new Date(this.user.birthday);
    console.log(birthday);
    // eslint-disable-next-line max-len
    this.birthday = `${birthday.getDate()}/${birthday.getMonth()}/${birthday.getFullYear()} ${birthday.getHours()}:${birthday.getMinutes()}`;
    this.formUser = this.fb.group({
      name: [''],
      email: ['', Validators.required ,Validators.email],
      // eslint-disable-next-line max-len
      phoneNumber: ['', [Validators.required, Validators.minLength(8),Validators.pattern('(84|0[3|5|7|8|9])+([0-9]{8})')]],
      birthDay: ['', Validators.required],
      homeTown: [''],
      gender: [''],
      //profiles
      skill:['',Validators.required],
      desiredSalary:['',Validators.required],
      desiredWorkingAddress:['',Validators.required],
      numberYearsExperience:['',Validators.required,Validators.pattern('([0-9][0-9])|([1-9]\\d{3}\\d*)')],
      desiredWorkingForm:['',Validators.required],
      academicLevel:['',Validators.required],
    });
  }

  public getUserByUserName(username: string): void {
    this.userService.getUserByUserName(username).subscribe(
      (data: User) => {
        this.user = data;
        this.avatarUrl=environment.apiImageUrl+this.user.avatarName;
        this.getProfiles();
        console.log('data pass: ',this.user);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  public getProfilesByUserId(id: number): void {
    this.userService.getUserProfilesByUserId(id).subscribe(
      (data: Profiles) => {
        if(data){
          this.profiles = data;
        } else {
          this.profiles = {
            academicLevel: {id:1,code:'Cao Đẳng',description:'abc',delete:false},
            delete: 0,
            description: '',
            desiredSalary: '',
            desiredWorkingAddress: '',
            desiredWorkingForm: '',
            id: 0,
            numberYearsExperience: 0,
            skill: '',
            user: undefined,
          };
        }
        this.avatar = 'http://localhost:9090/api/public/files/'+this.user.avatarName;
        this.initForm();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  public getAllAcademicLevel(): void {
    this.userService.getAllAcademicLevel().subscribe(
      (data: AcademicLevel[]) => {
        this.academicLevels = data;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }
  public getUser(): void {
    const token = this.userService.getDecodedAccessToken();
    this.getUserByUserName(token.sub);
  }
  public getProfiles(): void {
    this.getProfilesByUserId(this.user.id);
  }
  onSubmit() {
    this.updateUser();
    this.updateProfile();
    console.log('User id: ', this.user.id);
    if(this.fileAvatar){
      this.uploadAvatar();
    }
    this.router.navigate(['/home-public']).then(r => console.log(r));
  }

  getUserValue(): void {
    this.user.name=this.formUser.value.name;
    this.user.phoneNumber=this.formUser.value.phoneNumber;
    this.user.birthday=this.formUser.value.birthDay;
    this.user.homeTown=this.formUser.value.homeTown;
    this.user.gender=this.formUser.value.gender;
    const token = this.userService.getDecodedAccessToken();
    this.user.userName=token.sub;
  }

  getProfilesValue(){
    this.profiles.user=this.user;
    this.profiles.skill=this.formUser.value.skill;
    this.profiles.desiredWorkingAddress=this.formUser.value.desiredWorkingAddress;
    this.profiles.academicLevel=this.formUser.value.academicLevel;
    this.profiles.desiredSalary=this.formUser.value.desiredSalary;
    this.profiles.desiredWorkingForm=this.formUser.value.desiredWorkingForm;
  }

  public updateProfile(){
     this.getProfilesValue();
    this.userService.updateUserProfile(this.profiles).subscribe(
      (data: any) => {
       if(!data){
         alert('Cập nhật thất bại !');
       }else {
         alert('Cập nhật thành công !');
       }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  public updateUser(){
    this.getUserValue();
    this.userService.updateUser(this.user).subscribe(
      (data: any) => {
        console.log(data);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }
  onSelectedAvatar(event) {
    this.fileAvatar = event.currentFiles[0];
    console.log('day la file', this.fileAvatar);
  }

  uploadAvatar() {
    this.uploadService.uploadAvatar(this.fileAvatar, this.user.id).subscribe(
      (data: any) => {
        alert(data.message);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }



}


