import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, zip } from 'rxjs';
import { TaskModel } from 'src/app/shared/models/task.model';

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

  createTask(task: TaskModel): Observable<any> {
    return this.http.post<any>(this.baseURL + 'tasks', task);
  }

  editTask(Id: number, taskData: TaskModel): Observable<any> {
    return this.http.put<any>(this.baseURL + 'tasks' + '/' + Id, taskData, {
      headers: this.headers,
    });
  }

  deleteTask(Id: number): Observable<any> {
    return this.http.delete<any>(this.baseURL + 'tasks' + '/' + Id);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.baseURL + 'users');
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
