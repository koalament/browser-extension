import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoCommentComponent } from './no-comment.component';

describe('NoCommentComponent', () => {
  let component: NoCommentComponent;
  let fixture: ComponentFixture<NoCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
