import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AkButtonComponent } from './ak-button.component';

describe('AkButtonComponent', () => {
  let component: AkButtonComponent;
  let fixture: ComponentFixture<AkButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AkButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AkButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
