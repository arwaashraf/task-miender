import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css'],
})
export class TaskCardComponent implements OnInit {
  @Input() task: any;
  @Output() delete_task = new EventEmitter();
  @Output() edit_task = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
