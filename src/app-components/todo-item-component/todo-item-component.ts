import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgStyle } from '@angular/common';
import { TodoItem } from '../../models';
import { TODO_CONSTANTS } from './todo-item-component-constants';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoActions } from '../../models';



@Component({
  selector: 'app-todo-item-component',
  standalone: true,
  imports: [NgStyle, ReactiveFormsModule],
  templateUrl: './todo-item-component.html',
  styleUrl: './todo-item-component.css'
})
export class TodoItemComponent {
  constants = TODO_CONSTANTS;
  updatedTaskName = new FormControl('');
  markAsDeleted = false;
  updateButtonPressed = false;
  trimmedUpdatedTask = '';


  @Output() todoActions = new EventEmitter<TodoActions>();
  @Input() todoItem: TodoItem | null = null;

  localTodoItem: TodoItem | null = null;

  ngOnChanges() {
    this.localTodoItem = { ...this.todoItem } as TodoItem;;
  }

  completeMark() {
    if (this.localTodoItem) {
      this.todoActions.emit({ toggleId: this.localTodoItem.id });
    }
  }

  deleteTodo() {
    if (this.localTodoItem) {
      this.markAsDeleted = false;
      this.todoActions.emit({ deleteId: this.localTodoItem.id });

    }
  }

  updateTodo() {
    this.updateButtonPressed = true;
    this.trimmedUpdatedTask = (this.updatedTaskName.value ?? '').trim();

    if (this.updatedTaskName.invalid || this.trimmedUpdatedTask === '') {
      return;
    }
    this.updateButtonPressed = false;
    if (this.localTodoItem) {
      this.todoActions.emit({ update: { toDoId: this.localTodoItem.id, newTaskTitle: this.trimmedUpdatedTask } });
      this.updatedTaskName.reset();

    }
  }



  resetText() {
    if (this.localTodoItem) {
      this.updateButtonPressed = false
      this.updatedTaskName.reset();
    }
  }
}