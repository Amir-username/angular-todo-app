export type TagType = 'all' | 'important' | 'shopping' | 'daily' | 'reminder'

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  description?: string;
  dragging?: boolean;
  isEditing?: boolean;
  tag: TagType
}
