import { DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'todo-list',
  imports: [DatePipe],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList {
  todos = input.required<Todo[]>();
  toggle = output<string>();
  delete = output<string>();
}
