import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsOPage } from './tabs-o.page';

describe('TabsOPage', () => {
  let component: TabsOPage;
  let fixture: ComponentFixture<TabsOPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsOPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsOPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
