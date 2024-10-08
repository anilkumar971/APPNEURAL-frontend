
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';

interface Task {
  id: number;
  title: string;
  description: string;
  completionStatus: boolean;
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  newTask: Task = { id: 0, title: '', description: '', completionStatus: false };

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
    });
  }

  addTask() {
    this.taskService.addTask(this.newTask).subscribe(() => {
      this.loadTasks();
      this.newTask = { id: 0, title: '', description: '', completionStatus: false };
    });
  }

  updateTask(task: Task) {
    task.completionStatus = !task.completionStatus;
    this.taskService.updateTask(task.id, task).subscribe(() => this.loadTasks());
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
  }
}

