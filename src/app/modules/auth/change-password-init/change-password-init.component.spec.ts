import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordInitComponent } from './change-password-init.component';

describe('ChangePasswordInitComponent', () => {
  let component: ChangePasswordInitComponent;
  let fixture: ComponentFixture<ChangePasswordInitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePasswordInitComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
