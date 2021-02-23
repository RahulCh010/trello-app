import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardsComponent } from './Components/boards/boards.component';
import { BoardListComponent } from './Components/board-list/board-list.component';

const routes: Routes = [
  {
    path: 'boards',
    component: BoardsComponent,
  },
  {
    path: 'board/:id',
    component: BoardListComponent,
  },
  {
    path: '',
    redirectTo: 'boards',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
