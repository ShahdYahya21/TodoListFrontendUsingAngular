import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { TodoItem,CreateTodoItemDTO } from './models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private http: HttpClient) { }


  private todoItems: TodoItem[] = [];
  filteredTasks: string[] = [];



  addTask(todoItem : CreateTodoItemDTO): Observable<TodoItem[]> {
    return this.http.post<TodoItem[]>('http://localhost:8080/Todo/saveTodoItem', todoItem);
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




  updateTask(todoItem: TodoItem): Observable<TodoItem[]> {
    return this.http.put<TodoItem[]>(`http://localhost:8080/Todo/updateTodoItem`, todoItem);

  }


  searchTasks(task: string): Observable<TodoItem[]> {
    const params = new HttpParams().set('task', task); 
    return this.http.get<TodoItem[]>('http://localhost:8080/Todo/searchForTodoItem', { params });
  }

}

