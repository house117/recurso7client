import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiembrosResultsPage } from './miembros-results.page';

describe('MiembrosResultsPage', () => {
  let component: MiembrosResultsPage;
  let fixture: ComponentFixture<MiembrosResultsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiembrosResultsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiembrosResultsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
