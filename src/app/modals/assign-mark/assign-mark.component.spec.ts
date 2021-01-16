import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignMarkComponent } from './assign-mark.component';

describe('AssignMarkComponent', () => {
  let component: AssignMarkComponent;
  let fixture: ComponentFixture<AssignMarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignMarkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
