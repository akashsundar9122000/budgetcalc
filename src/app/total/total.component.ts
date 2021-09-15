import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Budget } from '../budget.model';
import { BudgetService } from '../budget.service';


@Component({
  selector: 'app-total',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.css']
})
export class TotalComponent implements OnInit, OnDestroy {
amount:number=0;
result:Budget[]=[];
userId:string='';
totalSub:Subscription=new Subscription;
  constructor(private budgetService:BudgetService, private authService:AuthService) { }

  ngOnInit(): void {

    this.budgetService.getMoney();
    this.totalSub = this.budgetService.getMoneyListener().subscribe(res=>{
      this.amount=0;
      this.result=res;
      this.userId = this.authService.getUserId();
      for(let i=0;i<res.length;i++){
        if(res[i].creator == this.userId){
          if(res[i].moneyType=='income'){
            this.amount+=res[i].amount;
          }
          else{
            this.amount-=res[i].amount;
          }
        }
      }
    })

  }

  ngOnDestroy(){
    this.totalSub.unsubscribe();
  }

}
