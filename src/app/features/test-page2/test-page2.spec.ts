import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPage2 } from './test-page2';

describe('TestPage2', () => {
  let component: TestPage2;
  let fixture: ComponentFixture<TestPage2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestPage2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestPage2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
