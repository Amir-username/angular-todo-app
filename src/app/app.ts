import { Component, signal } from '@angular/core';
import { TodoForm } from './components/todo-form/todo-form.component';
import { TodoList } from './components/todo-list/todo-list.component';
import { TodoService } from './services/todo.service';
import { TagType, Todo } from './models/todo.model';
import { Tabs } from './tabs/tabs';

@Component({
  selector: 'todo-app',
  imports: [TodoForm, TodoList, Tabs],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  todos = signal<Todo[]>([]);
  selectedTodo = signal<Todo | null>(null);

  activeTab = signal<TagType>('all');

  view = signal<'list' | 'grid'>('list');

  setActiveTab(tab: TagType) {
    this.activeTab.set(tab);
    this.todos.set(this.todoService.getTodos());
    if (tab !== 'all') {
      this.todos.set(this.todos().filter((todo) => todo.tag === tab));
    }
  }

  constructor(private todoService: TodoService) {
    this.loadTodos();
  }

  loadTodos() {
    const storageTodos = this.todoService.getTodos();

    if (this.activeTab() === 'all') {
      this.todos.set(storageTodos);
    } else {
      this.todos.set(
        this.todoService
          .getTodos()
          .filter((todo) => todo.tag === this.activeTab())
      );
    }
  }

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
