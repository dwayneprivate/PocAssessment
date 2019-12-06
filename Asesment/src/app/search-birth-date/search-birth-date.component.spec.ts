import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBirthDateComponent } from './search-birth-date.component';

describe('SearchBirthDateComponent', () => {
  let component: SearchBirthDateComponent;
  let fixture: ComponentFixture<SearchBirthDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBirthDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBirthDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
