import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentEmailModalComponent } from './sent-email-modal.component';

describe('SentEmailModalComponent', () => {
  let component: SentEmailModalComponent;
  let fixture: ComponentFixture<SentEmailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentEmailModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentEmailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
