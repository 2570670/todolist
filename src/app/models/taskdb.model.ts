import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Task } from './interface/task.model'

@Injectable({
    providedIn: 'root'
})
export class TaskDB{
    private tasks: Task[] = [
        new Task(1, 'Test Task', 'Some text', 'Выполнено' ),        
        new Task(2, 'Test Task 2', 'Some text', 'Не выполнено' )
    ];

    getMaxID(): number{
        console.log('this.tasks.length : ' + this.tasks.length);
        if(this.tasks.length > 0){
            const i = this.tasks.length - 1
            return this.tasks[i].ID;
        }
        return 0;
    }

    getTasks(): Observable<Task[]>{
        return from([this.tasks]);
    }

    getTask(id:number): Task{
        return this.tasks.find(f => f.ID === id );
    }

    saveTask(task: Task){
        this.tasks.push(task);
    }

    updateTask(id: number, header: string, text: string, status: string){
        const line = this.tasks.find(f => f.ID === id );
        if(line != undefined){
            line.Header = header;
            line.Text = text;
            line.Status = status;
        }
    }

    setTaskStatus(id: number, status: string){
        const line = this.tasks.find(f => f.ID === id );
        if(line != undefined){
            line.Status = status;
        }
    }

    deleteTask(id: number){
        const index = this.tasks.findIndex(line => line.ID === id);
       console.log(index)
       this.tasks.splice(index, 1);

    }
}