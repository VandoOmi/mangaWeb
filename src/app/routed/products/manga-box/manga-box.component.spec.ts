import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaBoxComponent } from './manga-box.component';

describe('MangaBoxComponent', () => {
  let component: MangaBoxComponent;
  let fixture: ComponentFixture<MangaBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MangaBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MangaBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
