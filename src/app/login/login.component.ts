import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TodoAppService } from '../services/todo-app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean | undefined;

  constructor(public service: TodoAppService,
    private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  login(value:any) {

    let username = value.username; 
    this.service.loginUser().subscribe(
      res => {
        const token = (<any>res).token;
        localStorage.setItem("jwt", token);
        localStorage.setItem("user", username);
        this.invalidLogin = false;
        this.router.navigate(["/"]);
        this.toastr.success("LoggedIn successfully",username);
      },
      err => {
        this.invalidLogin = true;
      }
    );
  }
}
