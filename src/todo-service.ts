import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { TodoItem } from './models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private http: HttpClient) { }


  private todoItems: TodoItem[] = [];
  filteredTasks: string[] = [];



  addTask(newTask: string): Observable<TodoItem[]> {
    return this.http.post<TodoItem[]>('http://localhost:8080/Todo/saveTodoItem', newTask );
  }



  getTasks(): Observable<TodoItem[]>  {
   return this.http.get<TodoItem[]>('http://localhost:8080/Todo/getTodoItems');
  }



  deleteTask(todoID: number) {
    this.todoItems = this.todoItems.filter(todo => todo.id !== todoID);
  }



  toggleTheCompletionStatus(todoID: number): TodoItem {
    for (const task of this.todoItems) {
      if (task.id === todoID) {
        task.completed = !task.completed;
        return task;

      }
    }
    throw new Error('Task not found');
  }

  updateTask(todoID: number, updatedTask: string): TodoItem {
    for (const task of this.todoItems) {
      if (task.id === todoID) {
        task.taskTitle = updatedTask.trimStart();
        return task;
      }
    }
    throw new Error('Task not found');
  }


  searchTasks(task: string): TodoItem[] {
    const lowerQuery = task.trimStart().toLowerCase();
    return this.todoItems.filter(item =>
      item.taskTitle.toLowerCase().startsWith(lowerQuery)
    );
  }

  // private loadFromCookie(): void {
  //   const cookie = this.cookieService.get('TestCookie');
  //   if (cookie) {
  //     this.todoItems = JSON.parse(cookie);
  //   } else {
  //     this.todoItems = [];
  //   }
  // }
}