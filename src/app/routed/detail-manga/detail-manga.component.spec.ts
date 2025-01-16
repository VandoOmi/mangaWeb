import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMangaComponent } from './detail-manga.component';

describe('DetailMangaComponent', () => {
  let component: DetailMangaComponent;
  let fixture: ComponentFixture<DetailMangaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailMangaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailMangaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
