import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TaskDB } from 'src/app/models/taskdb.model';
import { Task } from 'src/app/models/interface/task.model';


@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  taskForm = new FormGroup({
    taskHeader: new FormControl(''),
    taskText: new FormControl(''),
    taskStatus: new FormControl("Не выполнено")
  });

  constructor(private taskDB: TaskDB) { }

  

  ngOnInit() {
  }

  saveTask(){
    console.log(this.taskForm.value);
    const header =  this.taskForm.value.taskHeader;
    const text   =  this.taskForm.value.taskText
    const status =  this.taskForm.value.taskStatus

    if((header == '' || text == '' || status == '') || (header == null || text == null || status == null)){
      window.alert('заплните все параметры новой задачи')
      return;
    }


    let id = this.taskDB.getMaxID() + 1;
    this.taskDB.saveTask(new Task(id, header, text, status));   
    this.taskForm.reset();

    this.taskForm.patchValue({
      taskStatus: "Не выполнено"
    })

  }

}
