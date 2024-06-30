import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgToastModule } from 'ng-angular-popup';
import { Task4Component } from './pages/task-4/task-4.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NgToastModule, Task4Component],
  template: '<router-outlet> <ng-toast>',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dga_assignments';
}
