import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { User } from "./auth.model";

@Injectable({providedIn:'root'})
export class AuthService{
  token:any;
  tokenTimer:any;
  isAuth:boolean=false;
  userId:any;
  error:string='';
  isAuthenticated = new Subject<boolean>();


  constructor(private http:HttpClient, private router:Router){}

  signUp(email:string,password:string){
    const user:User = {email:email,password:password};
    this.http.post('http://localhost:3000/user/signup',user).subscribe(res=>{
      this.router.navigate(['/login']);
    },error=>{
      console.log(error.error.message);
      this.error = error.error.message;
      this.router.navigate(['/error']);
    })
  }

  login(email:string,password:string){
    const user:User = {email:email,password:password};
    this.http.post<{token:string,expiresIn:number,userId:string}>('http://localhost:3000/user/login',user).subscribe(res=>{
      this.token=res.token;
      this.isAuth=true;
      this.isAuthenticated.next(true);
      const expiresInDuration = res.expiresIn;
      this.authSetTimer(expiresInDuration);
      const now = new Date();
      this.userId=res.userId;
      const expirationDate=new Date(now.getTime()+expiresInDuration*1000);
      this.saveAuthData(res.token,expirationDate,res.userId);
      this.router.navigate(['/budget']);
    },error=>{
      this.error = error.error.message;
      this.router.navigate(['/error']);
    })
  }

  getError(){
    return this.error;
  }

  getIsAuthenticated(){
    return this.isAuthenticated.asObservable();
  }

  getToken(){

    return this.token;
  }

  logout(){
    this.token=null;
    this.isAuthenticated.next(false);
    this.isAuth=false;
    this.clearAuthData();
    clearTimeout(this.tokenTimer);
    this.router.navigate(['/login']);
  }
  private authSetTimer(duration:number){
    this.tokenTimer = setTimeout(()=>{
      this.logout();
    },duration*1000) //setTimeout works with milli seconds so seconds*1000
  }
  autoAuthUser(){
    const authInformation = this.getAuthData();
    if(!authInformation){
      return;
    }
    const now=new Date();
    const expiresIn=authInformation.expirationDate.getTime()-now.getTime();
    if(expiresIn>0){
      this.isAuthenticated.next(true);
      this.isAuth=true;
      this.token=authInformation.token;
      this.userId=authInformation.userId;
      this.authSetTimer(expiresIn/1000) //because the number passed to this function is in seconds

    }
  }

  getUserId(){
    return this.userId;
  }

  getIsAuth(){
    return this.isAuth;
  }

  private saveAuthData(token:string,expirationDate:Date, userId:string){
    localStorage.setItem("token",token);
    localStorage.setItem("expiration",expirationDate.toISOString()); //date cannot be stored in local storage
    localStorage.setItem("userId",userId);
  }

  private clearAuthData(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
  }

  private getAuthData(){
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId=localStorage.getItem("userId");
    if(!token || !expirationDate){
      return;
    }
    return{
      token:token,
      expirationDate:new Date(expirationDate),
      userId:userId
    }
  }
}
