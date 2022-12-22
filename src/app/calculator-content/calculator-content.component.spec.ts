import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorContentComponent } from './calculator-content.component';

describe('CalculatorContentComponent', () => {
  let component: CalculatorContentComponent;
  let fixture: ComponentFixture<CalculatorContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculatorContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculatorContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
