import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksComponent } from './components/tasks/tasks.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { NewTaskComponent } from './components/new-task/new-task.component';




const tasks: Routes = [
  { path: 'new', component: NewTaskComponent },
  { path: ':id', component: EditTaskComponent }
]

const routes: Routes = [
  { path: '', redirectTo: 'task', pathMatch: 'full' },
  { path: 'task', component: TasksComponent, children: tasks },
  { path: '**', redirectTo: 'task', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forChild(tasks)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
