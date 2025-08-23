import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TodoService } from '../../todo-service';
import { NgStyle } from '@angular/common';
import { TodoItem } from '../../models';
import { TODO_CONSTANTS } from './todo-item-component-constants';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';



@Component({
  selector: 'app-todo-item-component',
  standalone: true,
  imports: [NgStyle,ReactiveFormsModule],
  templateUrl: './todo-item-component.html',
  styleUrl: './todo-item-component.css'
})
export class TodoItemComponent {
  constants = TODO_CONSTANTS;
  updatedTaskName = new FormControl('');

  constructor(private todoService: TodoService) { }

  @Output() changeOnTheList = new EventEmitter<void>();
  @Input() todoItem: TodoItem | null = null;

  localTodoItem: TodoItem | null = null;

  ngOnChanges() {
    this.localTodoItem = { ...this.todoItem } as TodoItem;;
  }

  completeMark() {
    if (this.localTodoItem) {
      this.localTodoItem = {
        ...this.todoService.toggleTheCompletionStatus(this.localTodoItem.id)
      };
    }
  }
  
  deleteTodo() {
    if (this.localTodoItem) {
      this.localTodoItem.markAsDeleted = false;
      this.todoService.deleteTask(this.localTodoItem.id);
      this.changeOnTheList.emit();

    }
  }

  updateTodo(){
    if (this.localTodoItem && this.updatedTaskName.valid) {
      const updatedTask = this.updatedTaskName.value;
      if(updatedTask){
      this.todoService.updateTask(this.localTodoItem.id, updatedTask);
      this.localTodoItem.markAsUpdated = false;
      this.updatedTaskName.reset();
      this.changeOnTheList.emit();

      }
  }     
}

resetText(){
  if (this.localTodoItem) {
    this.updatedTaskName.reset();
    this.localTodoItem.markAsUpdated = false;
}
}
}