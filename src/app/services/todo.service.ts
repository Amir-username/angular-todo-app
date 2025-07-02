import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TagType, Todo } from '../models/todo.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private stroageKey = 'todos';
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId); // Check if running in browser
  }

  getTodos(): Todo[] {
    if (!this.isBrowser) return []; // Skip in non-browser environments

    const todosJson = localStorage.getItem(this.stroageKey);
    return todosJson ? JSON.parse(todosJson) : [];
  }

  saveTodos(todos: Todo[]): void {
    if (!this.isBrowser) return; // Skip in non-browser environments
    localStorage.setItem(this.stroageKey, JSON.stringify(todos));
  }
  addTodo(title: string, description?: string, tag: TagType = 'daily'): Todo {
    const currTodos = this.getTodos();
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: title,
      completed: false,
      createdAt: new Date(),
      isEditing: false,
      description: description,
      tag: tag,
    };

    const newTodos = [...currTodos, newTodo];
    this.saveTodos(newTodos);

    return newTodo;
  }

  // addDescription(description: string) {

  // }

  editTodo(id: string, newTitle: string) {
    const currTodos = this.getTodos();

    const updatedTodos = currTodos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, title: newTitle };
      } else return todo;
    });

    this.saveTodos(updatedTodos);
  }

  toggleCompletion(id: string) {
    const currTodos = this.getTodos();

    const updatedTodos = currTodos.map((todo) => {
      return todo.id === id ? { ...todo, completed: !todo.completed } : todo;
    });

    this.saveTodos(updatedTodos);
  }

  deleteTodo(id: string) {
    const currTodos = this.getTodos();
    const filtered = currTodos.filter((todo) => {
      return todo.id !== id;
    });

    this.saveTodos(filtered);
  }

  reorderTodos(todos: Todo[]): void {
    this.saveTodos(todos);
  }
}
