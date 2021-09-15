import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BudgetService } from '../budget.service';

@Component({
  selector: 'app-outgoing',
  templateUrl: './outgoing.component.html',
  styleUrls: ['./outgoing.component.css']
})
export class OutgoingComponent implements OnInit {

  constructor(private budgetService:BudgetService) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    this.budgetService.addMoney(form.value.amount,form.value.reason,"expense");
    form.resetForm();
  }
}
