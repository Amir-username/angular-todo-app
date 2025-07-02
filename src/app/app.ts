import { Component, signal } from '@angular/core';
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
  todos = signal<Todo[]>([]);
  selectedTodo = signal<Todo | null>(null);

  constructor(private todoService: TodoService) {
    this.loadTodos();
  }

  loadTodos() {
    this.todos.set(this.todoService.getTodos());
  }

  // addTodo(title: string) {
  //   this.todoService.addTodo(title);
  //   this.loadTodos();
  // }

  toggleTodo(id: string) {
    this.todoService.toggleCompletion(id);
    this.loadTodos();
  }

  deleteTodo(id: string) {
    this.todoService.deleteTodo(id);
    this.loadTodos();
  }

  reorderTodos(todos: Todo[]) {
    this.todoService.reorderTodos(todos);
    this.todos.set(todos);
  }

  selectTodo(id: string) {
    let todo: Todo;
    this.todos().map((t) => {
      if (t.id === id) {
        todo = t;
        this.selectedTodo.set(todo);
      }
    });
  }
}
