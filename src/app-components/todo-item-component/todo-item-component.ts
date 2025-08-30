import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgStyle } from '@angular/common';
import { TodoItem } from '../../models';
import { TODO_CONSTANTS } from './todo-item-component-constants';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoActions } from '../../models';
import { customTaskTitleValidator } from '../validators/task-title.validator';

@Component({
  selector: 'app-todo-item-component',
  standalone: true,
  imports: [NgStyle, ReactiveFormsModule],
  templateUrl: './todo-item-component.html',
  styleUrl: './todo-item-component.css'
})
export class TodoItemComponent {
  constants = TODO_CONSTANTS;
  updatedTaskName = new FormControl(
    '',
    [Validators.required, customTaskTitleValidator()]
  );
  error = '';
  markAsDeleted = false;
  updateButtonPressed = false;
  confirmationButtonPressed = false;
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
    this.confirmationButtonPressed = true;
    const rawValue = this.updatedTaskName.value ?? '';
    this.trimmedUpdatedTask = rawValue.trim();

    if (this.updatedTaskName.valid) {
      this.confirmationButtonPressed = false;
    }
    if (this.updatedTaskName.invalid || this.trimmedUpdatedTask === '') {
      return;
    }
    if (this.localTodoItem) {
      this.todoActions.emit({
        update: {
          todoItem: {
            id: this.localTodoItem.id,
            taskTitle: this.trimmedUpdatedTask,
            completed: this.localTodoItem.completed
          }
        }
      });
      this.updatedTaskName.reset();
      this.updateButtonPressed = false;
      this.confirmationButtonPressed = false;

    }
  }

  onInputChange() {
    const rawValue = this.updatedTaskName.value ?? '';
    this.trimmedUpdatedTask = rawValue.trim();
  }



  resetText() {
    if (this.localTodoItem) {
      this.updateButtonPressed = false;
      this.updatedTaskName.reset();
      this.confirmationButtonPressed = false;

    }
  }
}