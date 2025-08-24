export type TodoItem = {
  id: number;
  taskTitle: string;
  completed: boolean;

};

export interface TodoActions {
  deleteId?: number;
  toggleId?: number;
  update?: { toDoId: number, newTaskTitle: string };
}