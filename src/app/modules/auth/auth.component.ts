import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'ngx-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  email: string;
  constructor(private router: Router) { }

  ngOnInit(): void {}

  homePublic() {
    this.router.navigate(['/home-public/']).then(r => console.log(r));
  }
}
