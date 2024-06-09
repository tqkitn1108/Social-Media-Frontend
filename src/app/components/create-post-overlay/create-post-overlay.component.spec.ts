import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePostOverlayComponent } from './create-post-overlay.component';

describe('CreatePostOverlayComponent', () => {
  let component: CreatePostOverlayComponent;
  let fixture: ComponentFixture<CreatePostOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatePostOverlayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatePostOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
