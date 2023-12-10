import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TasksService } from '../services/tasks.service';
import { TaskModel, TaskStaus } from 'src/app/shared/models/task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  todoTasks: TaskModel[] = [];
  inProgressTasks: TaskModel[] = [];
  doneTasks: TaskModel[] = [];

  desc: string = '';
  status: string = '';
  tasks: TaskModel[] = [];
  modalRef?: BsModalRef;

  constructor(
    private tasksService: TasksService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.tasksService.getSearchText().subscribe((text) => {
      this.getTasks(text);
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getTasks(text = '') {
    this.tasksService
      .getTasksWithUsers(text)
      .subscribe((tasks: TaskModel[]) => {
        this.tasks = tasks;
        this.setTasks(tasks);
      });
  }

  setTasks(tasks: TaskModel[]) {
    this.todoTasks = [...tasks].filter((t) => t.status === TaskStaus.ToDo);
    this.inProgressTasks = [...tasks].filter(
      (t) => t.status === TaskStaus.Inprogress
    );
    this.doneTasks = [...tasks].filter((t) => t.status === TaskStaus.Done);
  }

  deleteTask(task: TaskModel) {
    if (!task.id) return;
    this.tasksService.deleteTask(task.id).subscribe((res) => {
      this.getTasks();
    });
  }

  editTask(task: TaskModel) {
    if (!task.id) return;
    let data: TaskModel = {
      desc: `Some Todo`,
      status: 0,
      userId: 1,
    };
    this.tasksService.editTask(task.id, data).subscribe((response) => {
      this.getTasks();
    });
  }

  createTask() {
    let task: TaskModel = {
      userId: this.getRandomNumber(),
      desc: this.desc,
      status: +this.status,
    };
    this.tasksService.createTask(task).subscribe((response) => {
      this.getTasks();
    });
  }

  getRandomNumber(): number {
    return Math.floor(Math.random() * 5) + 1;
  }
}
