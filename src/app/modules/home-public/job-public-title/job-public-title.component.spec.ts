import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPublicTitleComponent } from './job-public-title.component';

describe('JobPublicTitleComponent', () => {
  let component: JobPublicTitleComponent;
  let fixture: ComponentFixture<JobPublicTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobPublicTitleComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobPublicTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
