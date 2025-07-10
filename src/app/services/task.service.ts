import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Task } from '../models/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private httpClient = inject(HttpClient);
  
  constructor() {}

  getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>('http://localhost:3000/tasks');
  }

  saveTasks(task: Task): Observable<Task> {
    return this.httpClient.post<Task>('http://localhost:3000/tasks', task);
  }
}
