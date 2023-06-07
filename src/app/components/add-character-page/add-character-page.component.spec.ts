import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCharacterPageComponent } from './add-character-page.component';

describe('AddCharacterPageComponent', () => {
  let component: AddCharacterPageComponent;
  let fixture: ComponentFixture<AddCharacterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCharacterPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCharacterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
