export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  dragging?: boolean;
  isEditing?: boolean
}
