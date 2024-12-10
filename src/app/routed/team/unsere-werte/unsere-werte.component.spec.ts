import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsereWerteComponent } from './unsere-werte.component';

describe('UnsereWerteComponent', () => {
  let component: UnsereWerteComponent;
  let fixture: ComponentFixture<UnsereWerteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnsereWerteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnsereWerteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
