import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetreiberComponent } from './betreiber.component';

describe('BetreiberComponent', () => {
  let component: BetreiberComponent;
  let fixture: ComponentFixture<BetreiberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BetreiberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BetreiberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
