import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

  authSub:Subscription = new Subscription;
  isAuth:boolean=false;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.isAuth = this.authService.getIsAuth();
    this.authSub = this.authService.getIsAuthenticated().subscribe(res=>{
      this.isAuth = res;
    })
  }
  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.authSub.unsubscribe();
  }
}
