import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministraionComponent } from './administraion.component';

describe('AdministraionComponent', () => {
  let component: AdministraionComponent;
  let fixture: ComponentFixture<AdministraionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministraionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministraionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
