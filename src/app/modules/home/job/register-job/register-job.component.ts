import {Component, Input, OnInit} from '@angular/core';
import {Job} from '../../../../models/model/Job';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {JobService} from '../../../../service/job.service';
import {JobRegister} from '../../../../models/model/JobRegister';
import {JobRegisterService} from '../../../../service/jobRegister.service';


@Component({
  selector: 'ngx-register-job',
  templateUrl: './register-job.component.html',
  styleUrls: ['./register-job.component.scss'],
})
export class RegisterJobComponent implements OnInit {
  @Input() jobRegister: JobRegister;
  public jobRegisters: JobRegister[];
  totalRecords: number;
  page = 0;
  size = 2;
  job: Job;

  // eslint-disable-next-line max-len
  constructor(private readonly route: ActivatedRoute, private jobService: JobService,
              private readonly router: Router, private jobRegisterService: JobRegisterService) {
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.params);
    this.getJobById();
  }

  public getJobById(): void {
    this.jobService.getJobById(this.route.snapshot.params.id).subscribe(
      (data: Job) => {
        this.job = data;
        this.getAllRegister(this.job.id);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  public getAllRegister(id) {
    const searchJobRegister = {jobId: id};
    this.jobRegisterService.findJobRegister(searchJobRegister, this.page, this.size).subscribe(
      (data: any) => {
        this.totalRecords = data.totalPage;
        this.jobRegisters = data?.list;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  paginate(event: any) {
    this.page = event.page;
    this.size = event.rows;
    this.getAllRegister(this.job.id);
  }
}
