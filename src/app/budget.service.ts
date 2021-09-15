import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { Budget } from "./budget.model";

@Injectable({providedIn:'root'})
export class BudgetService{
  moneyArray:any=[];
  moneyListener = new Subject<Budget[]>();
  editMoneyObject:any={}

  constructor(private http:HttpClient,private router:Router){}

  addMoney(amount:number,reason:string,type:string){
    const income:Budget={amount:amount,reason:reason,moneyType:type};
    this.http.post<{data:any}>('http://localhost:3000/money',income).subscribe((res)=>{
      this.getMoney();
    },error=>{
      console.log(error);
    })
  }

  getMoney(){
    this.http.get<{data:any}>('http://localhost:3000/money').subscribe((res)=>{
      this.moneyArray=res;
      console.log(this.moneyArray);
      this.moneyListener.next(this.moneyArray);
    })
  }

  deleteMoney(id:string){
    this.http.delete('http://localhost:3000/money/'+id).subscribe((res)=>{
      this.getMoney();
    })
  }

  updateBudget(id:string,amount:number,reason:string){
    const data={_id:id,amount:amount,reason:reason};
    this.http.put('http://localhost:3000/money/'+id,data).subscribe((res)=>{
      this.router.navigate(['/budget']);
    })
  }

  editMoney(edit:any){
    this.editMoneyObject=edit;
  }


  getEditMoney(){
    return this.editMoneyObject;
  }

  getMoneyListener(){
    return this.moneyListener.asObservable();
  }

}
