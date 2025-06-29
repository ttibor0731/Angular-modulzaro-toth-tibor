import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  imports: [FormsModule],
})
export class TasksComponent {
  tasks: { text: string; date: number }[] = [];
  newTask: { text: string; date: number } = { text: '', date: Date.now() };
  modal: any;
  editingTask: { text: string; date: number } | null = null;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.modal = new bootstrap.Modal(document.getElementById('taskModal'));
    this.loadTasks(); // 💾 Feladatok betöltése
  }

  openModal() {
    this.newTask = { text: '', date: Date.now() };
    this.editingTask = null;
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

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  // 🔽 ÚJ: Feladatok mentése a localStorage-be
  saveTasks() {
    const user = this.authService.getLoggedInUser();
    if (!user) return;
    localStorage.setItem(`tasks_${user.username}`, JSON.stringify(this.tasks));
  }

  // 🔽 ÚJ: Feladatok betöltése a localStorage-ből
  loadTasks() {
    const user = this.authService.getLoggedInUser();
    if (!user) return;
    const saved = localStorage.getItem(`tasks_${user.username}`);
    this.tasks = saved ? JSON.parse(saved) : [];
  }
}




