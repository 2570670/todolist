import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TaskDB } from 'src/app/models/taskdb.model';
import { Task } from 'src/app/models/interface/task.model';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  taskForm = new FormGroup({
    taskHeader: new FormControl(),
    taskText: new FormControl(),
    taskStatus: new FormControl()
  });

  task: Task;
  taskID: number;

  sRouter = this.router.events.subscribe((ev) => {
    if (ev instanceof NavigationEnd) { 
      const strid = this.ar.snapshot.params['id'];
      this.taskID = Number(strid);
      this.task = this.taskDb.getTask(this.taskID);
    }
    
  });


  constructor(private ar: ActivatedRoute, private taskDb: TaskDB, private router: Router) { }

  ngOnInit() {
    
   
    this.sRouter;
    this.taskForm.patchValue({
      taskHeader: this.task.Header,
      taskText: this.task.Text,
      taskStatus: this.task.Status

    })
  }

  saveTask(){
    const header =  this.taskForm.value.taskHeader;
    const text   =  this.taskForm.value.taskText
    const status =  this.taskForm.value.taskStatus

    if(header == '' || text == ''){
      window.alert('заплните все параметры новой задачи')
      return;
    }

    this.taskDb.updateTask(this.taskID, header, text, status);
    this.router.navigateByUrl('/task')
  }

  ngOnDestroy(){
    this.sRouter.unsubscribe

  }

 

}
