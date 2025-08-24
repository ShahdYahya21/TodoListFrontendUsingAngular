import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TodoItemComponent } from '../todo-item-component/todo-item-component';
import { TodoService } from '../../todo-service';
import { TodoItem } from '../../models';
import { TodoActions } from '../../models';


@Component({
  selector: 'app-todo-list-component',
  standalone: true,
  imports: [TodoItemComponent],
  templateUrl: './todo-list-component.html',
  styleUrls: ['./todo-list-component.css']
})
export class TodoListComponent {
  @Input() todoTask: string = '';
  @Input() searchedTodoItem: string = '';

  todoTasks: TodoItem[] = [];
  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.getTodos();

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['todoTask'] && changes['todoTask'].currentValue) {
      this.todoService.addTask(this.todoTask).subscribe(tasks => {
        this.todoTasks = tasks;  
        console.log("todoTasks after addition: ");
        console.log(this.todoTasks);
        this.todoTask = '';
      });
  
    }

    // if (changes['searchedTodoItem']) {
    //   this.todoTasks = this.searchedTodoItem
    //     ? this.todoService.searchTasks(this.searchedTodoItem)
    //     : this.todoService.getTasks();
    // }
  }
    // Handle the change emitted from the child component
  handleChange(action: TodoActions): void {
    if (action.deleteId) {
      this.deleteTodo(action.deleteId);
    } else if (action.toggleId) {
      this.toggleState(action.toggleId);
    } else if (action.update) {
      this.updateTodo(action.update.toDoId, action.update.newTaskTitle);
    }
  }


getTodos() {
  this.todoService.getTasks().subscribe(tasks => {
    this.todoTasks = tasks;  
    console.log("todoTasks after fetching from backend: ");
    console.log(this.todoTasks);
  });
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

updateTodo(toDoId : number, newTaskTitle : string) {
  this.todoService.updateTask(toDoId, newTaskTitle).subscribe(tasks => {
    this.todoTasks = tasks;  
    console.log("todoTasks after updating task: ");
    console.log(this.todoTasks);
  });
}
}
