import { Injectable } from '@angular/core';

export interface Task {
  text: string;
  date: number;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor() {}

  getTasks(username: string): Task[] {
    const saved = localStorage.getItem(`tasks_${username}`);
    return saved ? JSON.parse(saved) : [];
  }

  saveTasks(username: string, tasks: Task[]): void {
    localStorage.setItem(`tasks_${username}`, JSON.stringify(tasks));
  }
}
