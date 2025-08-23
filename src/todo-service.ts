import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { TodoItem } from './models';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private cookieService: CookieService) {
   }

  private todoItems: TodoItem[] = [];
  filteredTasks: string[] = [];


 addTask(newTask: string) {
  const maxId = this.todoItems.reduce((max, item) => item.id > max ? item.id : max, 0);
  const todoTask: TodoItem = {
    id: maxId + 1,
    task: newTask.trimStart(), 
    completed: false,
    markAsDeleted: false,
    markAsUpdated: false
  };

  this.todoItems.push(todoTask);
  this.cookieService.set('TestCookie', JSON.stringify(this.todoItems));
}

  getTasks() : TodoItem[]{
    this.loadFromCookie(); 
    return this.todoItems;
  }



  deleteTask(todoID : number){
    this.todoItems = this.todoItems.filter(todo => todo.id !== todoID);
    this.cookieService.set('TestCookie', JSON.stringify(this.todoItems));
  }



  toggleTheCompletionStatus (todoID : number) : TodoItem {
    for(const task of this.todoItems){
      if(task.id === todoID) {
        task.completed = !task.completed;
        this.cookieService.set('TestCookie', JSON.stringify(this.todoItems));
        return task;

      }
  } 
  throw new Error('Task not found');
}

updateTask(todoID: number, updatedTask: string): TodoItem {
  for (const task of this.todoItems) {
    if (task.id === todoID) {
      task.task = updatedTask.trimStart();
      this.cookieService.set('TestCookie', JSON.stringify(this.todoItems));
      return task;
    }
  }
  throw new Error('Task not found');
}


searchTasks(task: string): TodoItem[] {
  this.loadFromCookie(); 
  const lowerQuery = task.trimStart().toLowerCase(); 
  return this.todoItems.filter(item =>
    item.task.toLowerCase().startsWith(lowerQuery)
  );
}

private loadFromCookie(): void {
  const cookie = this.cookieService.get('TestCookie');
  if (cookie) {
    this.todoItems = JSON.parse(cookie);
  } else {
    this.todoItems = [];
  }
}
}