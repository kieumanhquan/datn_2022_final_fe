import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPublicDetailComponent } from './job-public-detail.component';

describe('JobPublicDetailComponent', () => {
  let component: JobPublicDetailComponent;
  let fixture: ComponentFixture<JobPublicDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobPublicDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobPublicDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
