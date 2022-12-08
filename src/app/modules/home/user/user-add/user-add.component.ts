import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../service/auth.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'ngx-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss'],
})
export class UserAddComponent implements OnInit {

  regiJe: FormGroup;
  constructor(private fb: FormBuilder,
              private authService: AuthService) { }

  ngOnInit() {
    this.regiJe = this.fb.group({
      userName: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9_]*$')]],
      // eslint-disable-next-line max-len
      password: ['', [Validators.required,Validators.maxLength(16),Validators.pattern('^(?=[^A-Z\\n]*[A-Z])(?=[^a-z\\n]*[a-z])(?=[^0-9\\n]*[0-9])(?=[^#?!@$%^&*\\n-]*[#?!@$%^&*-]).{8,}$')]],
      name: ['', [Validators.required,Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      // eslint-disable-next-line max-len
      phoneNumber: ['', [Validators.required,Validators.pattern('(84|0[3|5|7|8|9])+([0-9]{8})')]],
    });
  }
  public addUser(){
    console.log('chay dc den day');
    this.authService.addJeUser(this.regiJe.value).subscribe(
      (data: any) => {
        // eslint-disable-next-line eqeqeq
        
        // if (data == false) {
        //   alert('Đăng ký thất bại');
        // } else {
        //   alert('Đăng ký thành công');
        // }
        alert('Đăng ký thành công');
      },
      (error: HttpErrorResponse) => {
        alert(error.error.message);
        // console.log(error);
        // console.log(error.status)
        console.log(error.error.message);
      },
    );
  }
  onSubmit() {
    console.log('hcay dc den day');
    this.addUser();
  }
}
