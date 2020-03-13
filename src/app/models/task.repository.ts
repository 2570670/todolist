import { Injectable } from '@angular/core';
import { Task } from './interface/task.model';
import { TaskDB } from './taskdb.model';

@Injectable({
    providedIn: 'root'
})
export class TaskRepository {
    private tasks: Task[] = [];
    private categories: string[] = [];

    constructor(private taskdb: TaskDB){
        taskdb.getTasks().subscribe(data => {
            this.tasks = data;
            this.categories = data.map(p => p.Status)
            .filter((c, index, array) => array.indexOf(c) === index).sort();
        })
    }

    getTasks(status: string = null): Task[]{
        return this.tasks
            .filter(t => status == null || status === t.Status);
    }

    getTask(id: number): Task {
        return this.tasks.find(t => t.ID === id);
    }

    getCategories(): string[] {
        return this.categories;
    }

}