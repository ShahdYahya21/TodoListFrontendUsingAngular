import { Component, EventEmitter, Output, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainComponent } from '../app-components/main-component/main-component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MainComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {

}