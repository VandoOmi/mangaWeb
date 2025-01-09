import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLineComponent } from './admin-line.component';

describe('AdminLineComponent', () => {
  let component: AdminLineComponent;
  let fixture: ComponentFixture<AdminLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminLineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
