import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EllipseCarouselComponent } from './ellipse-carousel.component';

describe('EllipseCarouselComponent', () => {
  let component: EllipseCarouselComponent;
  let fixture: ComponentFixture<EllipseCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EllipseCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EllipseCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
