import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {}

  search(e: Event) {
    const text = (e.target as HTMLInputElement).value;
    this.tasksService.setSearchText(text);
  }
}
