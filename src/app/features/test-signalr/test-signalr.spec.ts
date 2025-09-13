import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSignalr } from './test-signalr';

describe('TestSignalr', () => {
  let component: TestSignalr;
  let fixture: ComponentFixture<TestSignalr>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestSignalr]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestSignalr);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
