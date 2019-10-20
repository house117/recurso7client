import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepMovPage } from './dep-mov.page';

describe('DepMovPage', () => {
  let component: DepMovPage;
  let fixture: ComponentFixture<DepMovPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepMovPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepMovPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
