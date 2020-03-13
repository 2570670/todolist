import { Component, OnInit } from '@angular/core';
import { TaskRepository } from 'src/app/models/task.repository';
import { Task } from 'src/app/models/interface/task.model';
import { TaskDB } from 'src/app/models/taskdb.model';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  constructor( private taskRepository: TaskRepository, private taskDB: TaskDB, private router: Router
                 ) { }

  private selectCategory = null;

  ngOnInit(  ) {  }

  get tasks(): Task[] {
    return this.taskRepository.getTasks(this.selectCategory)
  }

  get categories(): string[] {
    return this.taskRepository.getCategories();
  }

  public changeTaskCategory(newCategory?: string) {
    this.selectCategory = newCategory;
  }

  changeTaskStatus(taskid: number, status: string){
      if(status == 'Выполнено'){
        status = 'Не выполнено'
      }else{
        status = 'Выполнено'
      }
      this.taskDB.setTaskStatus(taskid, status);    
  }

  deleteTask(id: number){
    this.taskDB.deleteTask(id);
  }

  showEditTask(id: number){
    this.router.navigateByUrl('/task');
    setTimeout(() => {
      this.router.navigateByUrl('/task/' + id);
    }, 150);

  }

}
