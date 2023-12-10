import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, zip } from 'rxjs';
import { TaskModel, UsersModal } from 'src/app/shared/models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  baseURL = 'http://localhost:3000/';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  searchText = new BehaviorSubject<string>('');

  getSearchText(): Observable<string> {
    return this.searchText.asObservable();
  }

  setSearchText(value: string) {
    this.searchText.next(value);
  }

  constructor(private http: HttpClient) {}

  getTasks(text: string): Observable<TaskModel[]> {
    return this.http.get<any[]>(this.baseURL + 'tasks', {
      params: { q: text },
    });
  }

  createTask(task: TaskModel): Observable<TaskModel> {
    return this.http.post<TaskModel>(this.baseURL + 'tasks', task);
  }

  editTask(Id: number, taskData: TaskModel): Observable<TaskModel> {
    return this.http.put<TaskModel>(
      this.baseURL + 'tasks' + '/' + Id,
      taskData,
      {
        headers: this.headers,
      }
    );
  }

  deleteTask(Id: number): Observable<TaskModel> {
    return this.http.delete<TaskModel>(this.baseURL + 'tasks' + '/' + Id);
  }

  getUsers(): Observable<UsersModal[]> {
    return this.http.get<UsersModal[]>(this.baseURL + 'users');
  }

  getTasksWithUsers(text = '') {
    return zip(this.getTasks(text), this.getUsers()).pipe(
      map(([tasks, users]) => {
        return [...tasks].map((t) => ({
          ...t,
          user: users.find((u) => u.id === t.userId),
        }));
      })
    );
  }
}
