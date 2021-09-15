import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  error:string='An unexpected error occured';
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.error = this.authService.getError();
  }

}
