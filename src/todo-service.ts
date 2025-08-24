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
    return this.http.post<TodoItem[]>('http://localhost:8080/Todo/saveTodoItem', newTask);
  }



  getTasks(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>('http://localhost:8080/Todo/getTodoItems');
  }



  deleteTask(todoID: number): Observable<TodoItem[]> {
    return this.http.delete<TodoItem[]>(`http://localhost:8080/Todo/deleteTodoItem/${todoID}`);
  }



  toggleTheCompletionStatus(todoID: number): Observable<TodoItem[]> {
    return this.http.put<TodoItem[]>(`http://localhost:8080/Todo/toggleCompletionStatus/${todoID}`, {});
  }




  updateTask(todoID: number, updatedTask: string): Observable<TodoItem[]>{
    return this.http.put<TodoItem[]>(`http://localhost:8080/Todo/updateTodoItem/${todoID}`, updatedTask);

  }


  searchTasks(task: string): TodoItem[] {
    const lowerQuery = task.trimStart().toLowerCase();
    return this.todoItems.filter(item =>
      item.taskTitle.toLowerCase().startsWith(lowerQuery)
    );
  }
}

