import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddresseComponent } from './addresse.component';

describe('AddresseComponent', () => {
  let component: AddresseComponent;
  let fixture: ComponentFixture<AddresseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddresseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddresseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
