import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BudgetService } from '../budget.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  details:any={}
  title:string='';
  amount:number=0;
  reason:string='';
  constructor(private budgetService:BudgetService) { }

  ngOnInit(): void {
    this.details=this.budgetService.getEditMoney();
    this.title=this.details.type;
    this.amount = this.details.amount;
    this.reason=this.details.reason;
  }
  onSubmit(form:NgForm){
    this.budgetService.updateBudget(this.details.id,form.value.amount,form.value.reason);

  }

}
