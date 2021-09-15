import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BudgetService } from '../budget.service';

@Component({
  selector: 'app-incomming',
  templateUrl: './incomming.component.html',
  styleUrls: ['./incomming.component.css']
})
export class IncommingComponent implements OnInit {

  constructor(private budgetService:BudgetService) { }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm){
    this.budgetService.addMoney(form.value.amount,form.value.reason,"income");
    form.resetForm();
  }

}
