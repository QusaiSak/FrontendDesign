import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamChangeComponent } from './exam-change.component';

describe('ExamChangeComponent', () => {
  let component: ExamChangeComponent;
  let fixture: ComponentFixture<ExamChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamChangeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
