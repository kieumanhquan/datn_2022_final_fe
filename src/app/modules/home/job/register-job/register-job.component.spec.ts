import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterJobComponent } from './register-job.component';

describe('JobDetailsComponent', () => {
  let component: RegisterJobComponent;
  let fixture: ComponentFixture<RegisterJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterJobComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
