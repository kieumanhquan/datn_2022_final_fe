import {Component, OnInit} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {Router} from '@angular/router';
import {User} from '../../models/model/User';
import {HttpErrorResponse} from '@angular/common/http';
import {UserService} from '../../service/user.service';

// @ts-ignore
// @ts-ignore
@Component({
  selector: 'ngx-home-public',
  templateUrl: './home-public.component.html',
  styleUrls: ['./home-public.component.scss'],
})
export class HomePublicComponent implements OnInit {
  user: any;

  constructor(private readonly router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  public getUserByUserName(username: string): void {
    this.userService.getUserByUserName(username).subscribe(
      (data: User) => {
        this.user = data;
        console.log('roles', data.roles);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  public getUser(): void {
    const token = this.userService.getDecodedAccessToken();
    if (token) {
      this.getUserByUserName(token.sub);
    }
  }
  role() {
    // eslint-disable-next-line max-len
    if (this.userService.getDecodedAccessToken().auth === 'ROLE_ADMIN' || this.userService.getDecodedAccessToken().auth === 'ROLE_JE') {
      return true;
    }else {
      return false;
    }
  }

  onSignIn() {
    this.router.navigate(['/auth']).then(r => console.log(r));
  }

  onSignUp() {
    this.router.navigate(['/auth/signup']).then(r => console.log(r));
  }

  onLogOut() {
    window.localStorage.removeItem('auth-token');
    this.user = undefined;
    this.router.navigate(['/home-public']).then(r => console.log(r));
  }

  onEditInfo() {
    this.router.navigate(['/home-public/user/edit']).then(r => console.log(r));
  }

  onHomeAdmin() {
    this.router.navigate(['/home']).then(r => console.log(r));
  }
}
