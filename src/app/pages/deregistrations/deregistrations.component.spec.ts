import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeregistrationsComponent } from './deregistrations.component';

describe('DeregistrationsComponent', () => {
  let component: DeregistrationsComponent;
  let fixture: ComponentFixture<DeregistrationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeregistrationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeregistrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
