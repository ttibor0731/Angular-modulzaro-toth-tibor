import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';


declare var bootstrap: any;

@Component({
  selector: 'app-tasks',
  standalone: false,
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent {
  public newTaskTitle = '';
  taskService = inject(TaskService);
  modal: any;
  public tasks = signal<Task[]>([]);

  ngOnInit() {
    this.modal = new bootstrap.Modal(document.getElementById('taskModal'));
    this.loadTasks(); // 💾 Feladatok betöltése
  }

   // 🔽 ÚJ: Feladatok betöltése a localStorage-ből
  loadTasks() {
   this.taskService.getTasks().subscribe((list) => this.tasks.set(list));
  }

  openModal() {
    this.newTaskTitle = '';
    this.modal.show();
  }

  saveTask() {
    if (!this.newTask.text || !this.newTask.date) return;

    if (this.editingTask) {
      const index = this.tasks.indexOf(this.editingTask);
      if (index !== -1) {
        this.tasks[index] = { ...this.newTask };
      }
      this.editingTask = null;
    } else {
      this.tasks.push({ ...this.newTask });
    }

    this.saveTasks(); // 💾 Mentés localStorage-be
    this.modal.hide();
  }

  editTask(task: { text: string; date: number }) {
    this.newTask = { ...task };
    this.editingTask = task;
    this.modal.show();
  }

  deleteTask(task: { text: string; date: number }) {
    this.tasks = this.tasks.filter(t => t !== task);
    this.saveTasks(); // 💾 Frissítés mentés után
  }



  // 🔽 ÚJ: Feladatok mentése a localStorage-be
  saveTasks() {
    const user = this.authService.getLoggedInUser();
    if (!user) return;
    localStorage.setItem(`tasks_${user.username}`, JSON.stringify(this.tasks));
  }

 
}




