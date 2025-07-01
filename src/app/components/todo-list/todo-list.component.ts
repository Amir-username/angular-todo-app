import { DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Todo } from '../../models/todo.model';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'todo-list',
  imports: [DatePipe, DragDropModule, FormsModule],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList {
  todos = input.required<Todo[]>();
  toggle = output<string>();
  delete = output<string>();
  reorder = output<Todo[]>();

  drop(event: CdkDragDrop<Todo[]>) {
    const todos = [...this.todos()];
    moveItemInArray(todos, event.previousIndex, event.currentIndex);
    this.reorder.emit(todos);
  }
}
