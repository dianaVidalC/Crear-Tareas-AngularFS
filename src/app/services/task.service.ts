import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Task } from '../models/task';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasksCollection: AngularFirestoreCollection<Task>;
  tasks: Observable<Task[]>;
  taskDoc: AngularFirestoreDocument<Task>;

  constructor(private afs: AngularFirestore) {
    this.tasksCollection = this.afs.collection('tareas');
    // this.tasks = this.afs.collection('tasks').valueChanges();
    this.tasks = this.tasksCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Task;
          const id = a.payload.doc.id;
          return {id,...data};
      }))
    );
  }
  getTasks(){
    return this.tasks;
  }
  addTask(task: Task) {
    this.tasksCollection.add(task);
  }
  deleteTask(task: Task){
    this.taskDoc = this.afs.doc(`tareas/${task.id}`);
    this.taskDoc.delete();
  }
  updateTask(task: Task){
    this.taskDoc = this.afs.doc(`tareas/${task.id}`);
    this.taskDoc.update(task);
  }
}
