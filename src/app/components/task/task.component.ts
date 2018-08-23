import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  tasks: Task[];
  editState: boolean = false;
  taskToEdit: Task[];

  constructor(private taskServices: TaskService) { }

  ngOnInit() {
    this.taskServices.getTasks().subscribe((task) => {
      this.tasks = task
    });
  }
  deleteTask(event, task) {

    const response = confirm("¿Está seguro que desea eliminar esta tarea?");

    if(response) this.taskServices.deleteTask(task);

    return;
  }
  editTask (event, task) {
    this.editState = !this.editState;
    this.taskToEdit = task;
  }
  updateTask(task) {
    this.taskServices.updateTask(task);
    this.editState = false;
    this.taskToEdit = null;
  }
}
