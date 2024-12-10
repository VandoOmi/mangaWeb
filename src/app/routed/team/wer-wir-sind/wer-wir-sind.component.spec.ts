import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WerWirSindComponent } from './wer-wir-sind.component';

describe('WerWirSindComponent', () => {
  let component: WerWirSindComponent;
  let fixture: ComponentFixture<WerWirSindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WerWirSindComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WerWirSindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
