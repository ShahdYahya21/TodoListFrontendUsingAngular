export type TodoItem = {
  id: number;
  taskTitle: string;
  completed: boolean;

};

export interface TodoActions {
  deleteId?: number;
  toggleId?: number;
  update?: { todoItem : TodoItem};
}

export interface CreateTodoItemDTO {
  taskTitle: string;
  completed: boolean;
}