import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiembrosCreatePage } from './miembros-create.page';

describe('MiembrosCreatePage', () => {
  let component: MiembrosCreatePage;
  let fixture: ComponentFixture<MiembrosCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiembrosCreatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiembrosCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
