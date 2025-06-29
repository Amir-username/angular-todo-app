import { Component } from '@angular/core';
import { TodoForm } from './components/todo-form/todo-form.component';
import { TodoList } from './components/todo-list/todo-list.component';
import { TodoService } from './services/todo.service';
import { Todo } from './models/todo.model';

@Component({
  selector: 'todo-app',
  imports: [TodoForm, TodoList],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  todos: Todo[] = [];

  constructor(private todoService: TodoService) {
    this.loadTodos();
  }

  loadTodos() {
    this.todos = this.todoService.getTodos();
  }

  addTodo(title: string) {
    this.todoService.addTodo(title);
    this.loadTodos();
  }

  toggleTodo(id: string) {
    this.todoService.toggleCompletion(id);
    this.loadTodos();
  }

  deleteTodo(id: string) {
    this.todoService.deleteTodo(id);
    this.loadTodos();
  }
}
