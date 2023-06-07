import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollRotateComponent } from './scroll-rotate.component';

describe('ScrollRotateComponent', () => {
  let component: ScrollRotateComponent;
  let fixture: ComponentFixture<ScrollRotateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrollRotateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrollRotateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
