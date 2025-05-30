import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdminExpensesComponent } from './add-admin-expenses.component';

describe('AddAdminExpensesComponent', () => {
  let component: AddAdminExpensesComponent;
  let fixture: ComponentFixture<AddAdminExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAdminExpensesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAdminExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
