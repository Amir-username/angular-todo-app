import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'todo-form',
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.css',
  imports: [FormsModule],
})
export class TodoForm {
  title = '';
  todoAdd = output<string>();

  addTodo() {
    if (this.title.trim()) {
      this.todoAdd.emit(this.title);
      this.title = '';
    }
  }
}
