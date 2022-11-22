import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPublicInfoComponent } from './job-public-info.component';

describe('JobPublicInfoComponent', () => {
  let component: JobPublicInfoComponent;
  let fixture: ComponentFixture<JobPublicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobPublicInfoComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobPublicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
