import { Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { TagType } from '../../models/todo.model';

@Component({
  selector: 'todo-form',
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.css',
  imports: [FormsModule],
})
export class TodoForm {
  title = '';
  description = '';
  tag: TagType = 'daily'

  isDescOpen = signal<boolean>(false);

  constructor(private todoService: TodoService) {
    this.loadTodos.emit()
  }

  // todoAdd = output<string>();

  loadTodos = output()

  addTodo() {
    if (this.title.trim()) {
      this.todoService.addTodo(this.title, this.description, this.tag)
      this.loadTodos.emit()
      this.title = '';
      this.description = ''
    }
  }
}
