import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WasWirTuenComponent } from './was-wir-tuen.component';

describe('WasWirTuenComponent', () => {
  let component: WasWirTuenComponent;
  let fixture: ComponentFixture<WasWirTuenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WasWirTuenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WasWirTuenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
