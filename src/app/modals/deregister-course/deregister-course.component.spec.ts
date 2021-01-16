import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeregisterCourseComponent } from './deregister-course.component';

describe('DeregisterCourseComponent', () => {
  let component: DeregisterCourseComponent;
  let fixture: ComponentFixture<DeregisterCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeregisterCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeregisterCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
