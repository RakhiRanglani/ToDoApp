import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Register } from '../models/register.model';
import { TodoAppService } from '../services/todo-app.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  getUsername: any;

  constructor(public service: TodoAppService,
    private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.getUsername = localStorage.getItem('user')

  }

  register(form: NgForm) {
    this.service.registerUser().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList(this.getUsername);
        this.toastr.success("Submitted successfully", "New User Registeration Complete");
      },
      err => { console.log(err); }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.registerData = new Register();
  }

}
