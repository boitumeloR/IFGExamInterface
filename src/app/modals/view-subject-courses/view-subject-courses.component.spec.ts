import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubjectCoursesComponent } from './view-subject-courses.component';

describe('ViewSubjectCoursesComponent', () => {
  let component: ViewSubjectCoursesComponent;
  let fixture: ComponentFixture<ViewSubjectCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSubjectCoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSubjectCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
