import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlysplinechartComponent } from './monthlysplinechart.component';

describe('MonthlysplinechartComponent', () => {
  let component: MonthlysplinechartComponent;
  let fixture: ComponentFixture<MonthlysplinechartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlysplinechartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlysplinechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
