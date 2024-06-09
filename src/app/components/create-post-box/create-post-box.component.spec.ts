import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePostBoxComponent } from './create-post-box.component';

describe('CreatePostBoxComponent', () => {
  let component: CreatePostBoxComponent;
  let fixture: ComponentFixture<CreatePostBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatePostBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatePostBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
