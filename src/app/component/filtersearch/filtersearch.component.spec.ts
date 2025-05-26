import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersearchComponent } from './filtersearch.component';

describe('FiltersearchComponent', () => {
  let component: FiltersearchComponent;
  let fixture: ComponentFixture<FiltersearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltersearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltersearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
