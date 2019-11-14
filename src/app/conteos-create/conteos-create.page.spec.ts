import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConteosCreatePage } from './conteos-create.page';

describe('ConteosCreatePage', () => {
  let component: ConteosCreatePage;
  let fixture: ComponentFixture<ConteosCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConteosCreatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConteosCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
