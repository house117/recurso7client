import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoMiembroPage } from './info-miembro.page';

describe('InfoMiembroPage', () => {
  let component: InfoMiembroPage;
  let fixture: ComponentFixture<InfoMiembroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoMiembroPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoMiembroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
