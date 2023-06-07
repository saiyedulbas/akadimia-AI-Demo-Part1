import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeleportMobileComponent } from './teleport-mobile.component';

describe('TeleportMobileComponent', () => {
  let component: TeleportMobileComponent;
  let fixture: ComponentFixture<TeleportMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeleportMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeleportMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
