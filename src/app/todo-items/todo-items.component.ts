import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TodoItem } from '../models/todo-item.model';
import { TodoAppService } from '../services/todo-app.service';

@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemsComponent implements OnInit {
 getUsername: any;
  constructor(public service: TodoAppService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUsername = localStorage.getItem('user')
    this.service.refreshList(this.getUsername);
  }

  onEdit(selectedRecord: TodoItem) {
    this.service.todoData = Object.assign({}, selectedRecord);
  }

  onDelete(id: number) {
    if (confirm("Are you sure you want to delete this record?")) {
      this.service.deleteToDoItem(id)
      .subscribe( res => {
        this.service.refreshList(this.getUsername);
        this.toastr.error("Deleted susseccfully", "ToDo Item Register");
      },
      err => {
        console.log(err);
      })
    }
  }

}