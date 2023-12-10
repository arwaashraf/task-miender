import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TasksService } from '../services/tasks.service';
import { TaskModel } from 'src/app/shared/models/task.model';
import { TaskStaus } from 'src/app/shared/models/status.enum';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  @ViewChild('editTaskModal') editTaskModal!: TemplateRef<any>;

  todoTasks: TaskModel[] = [];
  inProgressTasks: TaskModel[] = [];
  doneTasks: TaskModel[] = [];
  editedTask: TaskModel = {
    userId: 0,
    desc: '',
    id: 0,
    status: TaskStaus.ToDo,
    users: undefined,
  };

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

  openModal(template: TemplateRef<HTMLElement>) {
    this.clearFormInputs();
    this.modalRef = this.modalService.show(template);
  }

  openEditModal(task: TaskModel) {
    this.editedTask = task;
    this.openModal(this.editTaskModal);
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

  editTask() {
    if (!this.editedTask.id) return;
    let data: TaskModel = {
      desc: this.editedTask.desc,
      status: +this.editedTask.status,
      userId: this.editedTask.userId,
    };
    this.tasksService
      .editTask(this.editedTask.id, data)
      .subscribe((response) => {
        this.getTasks();
        this.modalRef?.hide();
      });
  }

  createTask() {
    let task: TaskModel = {
      userId: this.getRandomNumber(),
      desc: this.desc,
      status: +this.status,
    };
    if (!task.desc || !task.status) return;
    this.tasksService.createTask(task).subscribe((response) => {
      this.getTasks();
      this.modalRef?.hide();
    });
  }

  getRandomNumber(): number {
    return Math.floor(Math.random() * 5) + 1;
  }

  clearFormInputs() {
    this.desc = '';
    this.status = '';
  }
}
