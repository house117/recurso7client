import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsDPage } from './tabs-d.page';

describe('TabsDPage', () => {
  let component: TabsDPage;
  let fixture: ComponentFixture<TabsDPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsDPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsDPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
