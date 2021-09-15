import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Budget } from '../budget.model';
import { BudgetService } from '../budget.service';

@Component({
  selector: 'app-display-incomming',
  templateUrl: './display-incomming.component.html',
  styleUrls: ['./display-incomming.component.css']
})
export class DisplayIncommingComponent implements OnInit, OnDestroy {

  incomeList:Budget[]=[];
  userId:string='';
  incomeSub:Subscription=new Subscription;
  constructor(private budgetService:BudgetService, private router:Router, private authService:AuthService) { }

  ngOnInit(): void {
    this.budgetService.getMoney();
    this.userId = this.authService.getUserId();
    this.incomeSub = this.budgetService.getMoneyListener().subscribe(res=>{
      this.incomeList=res;
    })
  }
  onDelete(id:any){
    this.budgetService.deleteMoney(id);
  }

  onEdit(id:any,amount:number,reason:string){
    const editDetails={id:id,amount:amount,reason:reason,type:"Income"};
    this.budgetService.editMoney(editDetails);
    this.router.navigate(['/edit']);
  }

  ngOnDestroy(){
    this.incomeSub.unsubscribe();
  }

}
