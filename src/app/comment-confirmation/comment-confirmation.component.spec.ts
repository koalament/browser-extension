import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentConfirmationComponent } from './comment-confirmation.component';

describe('CommentConfirmationComponent', () => {
  let component: CommentConfirmationComponent;
  let fixture: ComponentFixture<CommentConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
