import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepResultsPage } from './dep-results.page';

describe('DepResultsPage', () => {
  let component: DepResultsPage;
  let fixture: ComponentFixture<DepResultsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepResultsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepResultsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
