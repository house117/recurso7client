import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoRegisterPage } from './info-register.page';

describe('InfoRegisterPage', () => {
  let component: InfoRegisterPage;
  let fixture: ComponentFixture<InfoRegisterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoRegisterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoRegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
