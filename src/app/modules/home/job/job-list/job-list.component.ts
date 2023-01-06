// @ts-ignore
import {Component, Input, OnInit} from '@angular/core';
import {Job} from '../../../../models/model/Job';
import {JobService} from '../../../../service/job.service';
import {HttpErrorResponse} from '@angular/common/http';
import {StatusJob} from '../../../../models/model/StatusJob';
import {SelectItem} from 'primeng/api';
import {Router} from '@angular/router';
import {User} from '../../../../models/model/User';
import {UserService} from '../../../../service/user.service';
import {SearchJob} from '../../../../models/job/SearchJob';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {StatusDto} from '../../../../models/Dto/StatusDto';
import {JobRegisterService} from "../../../../service/jobRegister.service";

@Component({
  selector: 'ngx-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
})
export class JobListComponent implements OnInit {
  @Input() job: Job;
  statusDto: StatusDto;

  displayPositionReason: boolean;

  public jobs: Job[];
  user: User;
  searchJob: SearchJob;
  statusJobs: any[];
  selectedStatusJobAdvanced: any;
  filteredStatusJobs: any[];
  sortOptions: SelectItem[];
  sortOrder: number;
  sortField: string;
  sortKey: any;
  page: number;
  size: number;
  totalRecords: number;
  sortNumber: number;
  rangeValues: number[] = [0, 200];

  constructor(public jobService: JobService, private readonly router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
    this.getStatusJob();
    this.sortOptions = [
      {label: 'Tên công việc', value: 'name'},
      {label: 'Thời gian nộp hồ sơ', value: 'dueDate'},
    ];
    this.getInnitData();
    this.onSearch();
    this.getUser();
  }

  getInnitData() {
    this.selectedStatusJobAdvanced = {id: 6, code: 'Tất cả'};
    this.searchJob = {name: '', statusId: 1, salaryMin: 0, salaryMax: 200, addressWork: '', skills: ''};
    this.page = 0;
    this.size = 2;
    this.totalRecords = 5;
    this.sortNumber = 1;
  }

  public getStatusJob(): void {
    this.jobService.getStatusJob().subscribe(
      (data: StatusJob[]) => {
        this.statusJobs = data;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  onSortChange(event) {
    const value = event.value;
    console.log(value, value);

    if (value.indexOf('name') === 0) {
      this.sortNumber = 2;
      this.onSortByName();
    } else {
      this.sortNumber = 1;
      this.onSearch();
    }
  }

  filterStatusJob(event) {
    const filtered: any[] = [];
    const query = event.query;
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < this.statusJobs.length; i++) {
      const statusJob = this.statusJobs[i];
      if (statusJob.code.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(statusJob);
      }
    }
    this.filteredStatusJobs = filtered;
  }

  // @ts-ignore
  public onSearch() {
    console.log('status', this.selectedStatusJobAdvanced);
    // if (this.searchJob.statusId === 1) {
    //   this.searchJob.statusId = this.selectedStatusJobAdvanced.id;
    //   this.jobService.findJob(this.searchJob, this.page, this.size).subscribe(
    //     (data: any) => {
    //       this.jobs = data.list;
    //       this.totalRecords = data.totalPage;
    //     },
    //     (error: HttpErrorResponse) => {
    //       alert(error.message);
    //     },
    //   );
    // }
    if (this.selectedStatusJobAdvanced.id === 6) {
      this.searchJob.statusId = undefined;
    } else {
      this.searchJob.statusId = this.selectedStatusJobAdvanced.id;
    }
    this.jobService.findJob(this.searchJob, this.page, this.size).subscribe(
      (data: any) => {
        this.jobs = data.list;
        this.totalRecords = data.totalPage;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
    // }
    // this.searchJob.statusId = this.selectedStatusJobAdvanced.id;
    // this.jobService.findJob(this.searchJob, this.page, this.size).subscribe(
    //   (data: any) => {
    //     this.jobs = data.list;
    //     this.totalRecords = data.totalPage;
    //   },
    //   (error: HttpErrorResponse) => {
    //     alert(error.message);
    //   },
    // );
  }

  public onSortByName() {
    this.searchJob.statusId = this.selectedStatusJobAdvanced.id;
    this.jobService.sortByName(this.searchJob, this.page, this.size).subscribe(
      (data: any) => {
        this.jobs = data.list;
        this.totalRecords = data.totalPage;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  paginate(event: any) {
    this.page = event.page;
    this.size = event.rows;
    if (this.sortNumber === 1) {
      this.onSearch();
    } else {
      this.onSortByName();
    }
  }

  handleChangeSalary() {
    this.searchJob.salaryMin = this.rangeValues[0];
    this.searchJob.salaryMax = this.rangeValues[1];
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
    this.getUserByUserName(token.sub);
  }

  onAdd() {
    this.router.navigate(['/home/add-job']).then(r => console.log(r));
  }

  // exportPdf() {
  //   this.jobs = [{
  //     name: this.job.name, academicLevel: this.job.academicLevel.code, addressWork: this.job.addressWork,
  //     salary: this.job.salaryMax, description: this.job.description,
  //   }];
  //   const doc = new jsPDF('p', 'px');
  //   doc.setFontSize(20);
  //   // eslint-disable-next-line max-len
  //   // doc.addFileToVFS('Roboto-regular','77u/aW1wb3J0IHsganNQREYgfSBmcm9tICJqc3BkZiIKdmFyIGZvbnQgPSAndW5kZWZpbmVkJzsKdmFyIGNhbGxBZGRGb250ID0gZnVuY3Rpb24gKCkgewp0aGlzLmFkZEZpbGVUb1ZGUygnUm9ib3RvLXJlZ3VsYXItbm9ybWFsLnR0ZicsIGZvbnQpOwp0aGlzLmFkZEZvbnQoJ1JvYm90by1yZWd1bGFyLW5vcm1hbC50dGYnLCAnUm9ib3RvLXJlZ3VsYXInLCAnbm9ybWFsJyk7Cn07CmpzUERGLkFQSS5ldmVudHMucHVzaChbJ2FkZEZvbnRzJywgY2FsbEFkZEZvbnRdKQo=');
  //   // doc.addFont('Roboto-Regular', 'Roboto-regular', 'normal');
  //   // doc.setFont('Times', 'Roman');
  //   // this.addFont();
  //   // doc.addFont('Roboto-regular-normal.ttf', 'Roboto-regular', 'normal');
  //   doc.setFont('Roboto-regular', 'normal');
  //
  //   console.log('font', doc.getFontList());
  //
  //   autoTable(doc, {
  //     columns: this.exportColumns,
  //     body: this.jobs,
  //     didDrawPage: (dataArg) => {
  //       doc.text('  Job Jd', 10, 20);
  //     },
  //     styles: {
  //       font: 'Roboto regular',
  //       fontStyle: 'normal',
  //     },
  //   });
  //   doc.save('job.pdf');
  // }

  // exportColumns = [{title: 'Name', dataKey: 'name'},
  //   {title: 'Trình độ học vấn', dataKey: 'academicLevel'},
  //   {title: 'Địa chỉ làm việc', dataKey: 'addressWork'},
  //   {title: 'Lương', dataKey: 'salary'},
  //   {title: 'Mô tả', dataKey: 'description'}];

  onPreview(id: number) {
    this.router.navigate(['/home-public/job-detail', id]).then(r => console.log(r));
  }

  onUp() {
    this.getInit();
    this.statusDto.jobId = this.job.id;
    this.statusDto.statusId = 2;
    this.updateJob(this.statusDto);
  }

  getInit() {
    this.statusDto = {jobId: 1, statusId: 1};
  }

  public updateJob(statusDto) {
    this.jobService.updateStatusJob(statusDto).subscribe(
      (data: any) => {
        this.job.statusJob = data.statusJob;
        alert('Update thành công');
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }



}
