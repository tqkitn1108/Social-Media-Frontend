import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostOverlayComponent } from './post-overlay.component';

describe('PostOverlayComponent', () => {
  let component: PostOverlayComponent;
  let fixture: ComponentFixture<PostOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostOverlayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
