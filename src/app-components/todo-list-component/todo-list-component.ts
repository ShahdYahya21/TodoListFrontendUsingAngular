import { Component, Input, OnChanges, OnInit, SimpleChanges,AfterViewInit } from '@angular/core';
import { TodoItemComponent } from '../todo-item-component/todo-item-component';
import { Loader } from '../loader/loader';

import { TodoService } from '../../todo-service';
import { TodoItem, TodoActions } from '../../models';



@Component({
  selector: 'app-todo-list-component',
  standalone: true,
  imports: [TodoItemComponent,Loader],
  templateUrl: './todo-list-component.html',
  styleUrls: ['./todo-list-component.css']
})
export class TodoListComponent {
  @Input() todoTask: string = '';
  @Input() searchedTodoItem: string = '';

  todoTasks: TodoItem[] = [];
  isLoading: boolean = false;
  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.getTodos();

  }
  
  ngOnChanges(changes: SimpleChanges): void {
  // Handle changes to 'todoTask'
  if (changes['todoTask'] && changes['todoTask'].currentValue) {
    this.todoService.addTask({ taskTitle: this.todoTask, completed: false }).subscribe(
      (tasks) => {
        this.todoTasks = tasks;
        console.log("todoTasks after addition: ");
        console.log(this.todoTasks);
        this.todoTask = ''; 
      },
      (error) => {
        console.error("Error adding task", error); 
      }
    );
  }

  if (changes['searchedTodoItem']) {
    const currentSearchValue = changes['searchedTodoItem'].currentValue;
    const previousSearchValue = changes['searchedTodoItem'].previousValue;

    if (currentSearchValue && currentSearchValue.trim() !== '' && currentSearchValue !== previousSearchValue) {
      this.todoService.searchTasks(currentSearchValue).subscribe(
        (tasks) => {
          this.todoTasks = tasks;
          console.log("todoTasks after searching: ");
          console.log(this.todoTasks);
        },
        (error) => {
          console.error("Error searching tasks", error); 
        }
      );
    }
  }
}


  handleChange(action: TodoActions): void {
    if (action.deleteId) {
      this.deleteTodo(action.deleteId);
    } else if (action.toggleId) {
      this.toggleState(action.toggleId);
    } else if (action.update) {
      this.updateTodo(action.update.todoItem);
    }
  }


  getTodos() {
    this.isLoading = true; 
    
    this.todoService.getTasks().subscribe(
      tasks => {
        this.todoTasks = tasks;
        console.log("todoTasks after fetching from backend: ");
        console.log(this.todoTasks);
        this.isLoading = false;
      },
      error => {
        console.error("Error fetching tasks: ", error);
        this.isLoading = false; 
      }
    );
  }

  deleteTodo(todoId: number) {
    this.todoService.deleteTask(todoId).subscribe(tasks => {
      this.todoTasks = tasks;
      console.log("todoTasks after deletion: ");
      console.log(this.todoTasks);
    });
  }
  toggleState(todoId: number) {
    this.todoService.toggleTheCompletionStatus(todoId).subscribe(tasks => {
      this.todoTasks = tasks;
      console.log("todoTasks after toggling completion status: ");
      console.log(this.todoTasks);
    });
  }

  updateTodo(todoItem : TodoItem) {
    this.todoService.updateTask(todoItem).subscribe(tasks => {
      this.todoTasks = tasks;
      console.log("todoTasks after updating task: ");
      console.log(this.todoTasks);
    });
  }
}
