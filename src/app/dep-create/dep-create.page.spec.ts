import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepCreatePage } from './dep-create.page';

describe('DepCreatePage', () => {
  let component: DepCreatePage;
  let fixture: ComponentFixture<DepCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepCreatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
