import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageItemComponent } from './page-item.component';

describe('PageItemCompnent', () => {
  let component: PageItemCompnent;
  let fixture: ComponentFixture<PageItemCompnent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageItemComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
