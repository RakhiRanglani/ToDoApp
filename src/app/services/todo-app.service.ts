import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TodoItem } from '../models/todo-item.model';
import { Login } from '../models/login.model';
import { Register } from '../models/register.model';

@Injectable({
  providedIn: 'root'
})
export class TodoAppService {
  readonly baseURL = "http://localhost:24288/api/Functional";
  readonly authURL = "http://localhost:24288/api/Security";
  list: TodoItem[]=[];

  constructor(private http: HttpClient) { }

  todoData: TodoItem = new TodoItem();
  loginData: Login = new Login();
  registerData: Register = new Register();

  postToDoItem() {
    return this.http.post(this.baseURL, this.todoData, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  putToDoItem() {
    console.log(this.todoData.itemId);
    console.log("Hello");
    console.log(this.todoData);
    return this.http.put(`${this.baseURL}/${this.todoData.itemId}`, this.todoData, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  deleteToDoItem(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  refreshList(Username:any) {
    console.log("****",`${this.baseURL}/${Username}`);
    
    this.http.get(`${this.baseURL}/${Username}`)
    .toPromise()
    .then(res => {
      this.list = res as TodoItem[]
    });
  }

  loginUser() {
    return this.http.post(`${this.authURL}/login`, this.loginData, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  registerUser() {
    return this.http.post(`${this.authURL}/register`, this.registerData, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

}