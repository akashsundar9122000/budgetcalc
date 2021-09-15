import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Budget } from '../budget.model';
import { BudgetService } from '../budget.service';

@Component({
  selector: 'app-display-outgoing',
  templateUrl: './display-outgoing.component.html',
  styleUrls: ['./display-outgoing.component.css']
})
export class DisplayOutgoingComponent implements OnInit, OnDestroy {

  expenseList:Budget[]=[];
  outSub:Subscription = new Subscription;
  userId:string=''
  constructor(private budgetService:BudgetService, private router:Router, private authService:AuthService) { }

  ngOnInit(): void {
    this.budgetService.getMoney();
    this.userId = this.authService.getUserId();
    this.outSub = this.budgetService.getMoneyListener().subscribe(res=>{
      this.expenseList=res;
    })
  }
  onDelete(id:any){
    this.budgetService.deleteMoney(id);
  }

  onEdit(id:any,amount:number,reason:string){
    const editDetails={id:id,amount:amount,reason:reason,type:"Expense"};
    this.budgetService.editMoney(editDetails);
    this.router.navigate(['/edit']);
  }

  ngOnDestroy(){
    this.outSub.unsubscribe();
  }

}
