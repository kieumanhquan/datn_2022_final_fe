import {Component, Input, OnInit} from '@angular/core';
import {Job} from '../../../models/model/Job';
import {Router} from '@angular/router';
// @ts-ignore
import * as module from 'module';
// @ts-ignore
import parse = module;
import {decode, encode} from 'punycode';


@Component({
  selector: 'ngx-job-public-title',
  templateUrl: './job-public-title.component.html',
  styleUrls: ['./job-public-title.component.scss'],
})
export class JobPublicTitleComponent implements OnInit {
  @Input() job: Job;

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
  }

  onReadDetail(id: number) {
    const id1 = id.toString();
    // atob()
    // this.router.navigate(['/home-public/job-detail', btoa(id1)]).then(r => console.log(r));
    this.router.navigate(['/home-public/job-detail', id]).then(r => console.log(r));
  }
}
