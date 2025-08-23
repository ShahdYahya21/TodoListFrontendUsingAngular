import { Component, EventEmitter, Output, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoListComponent } from '../todo-list-component/todo-list-component';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAIN_CONSTANTS } from './main-Component-Constants';



@Component({
  selector: 'app-main-component',
  standalone: true,
  imports: [RouterOutlet, TodoListComponent, ReactiveFormsModule],
  templateUrl: './main-component.html',
  styleUrl: './main-component.css'
})
export class MainComponent {
  constants = MAIN_CONSTANTS;
  newTask = new FormControl('', Validators.required);
  SearchedTask = new FormControl();
  newTaskName = '';
  submitted = false;
  trimmedTask = '';

  submit() {
    this.submitted = true;

    const rawValue = this.newTask.value ?? '';
    this.trimmedTask = rawValue.trim();

    if (this.newTask.invalid || this.trimmedTask === '') {
      return;
    }

    this.newTaskName = this.trimmedTask;
    this.newTask.reset();
    this.submitted = false;

  }
}

