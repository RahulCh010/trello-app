import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AppState } from './../../app.state';
import { BoardData } from './../../Models/boards.model';
import { openBoardDialog } from './../../Actions/board.actions';
import { activeBoardData } from './../../Actions/list.actions';


@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})
export class BoardsComponent implements OnInit {

  boardCollections: Observable<BoardData[]>;

  constructor(private store: Store<AppState>, private router: Router) {
    this.boardCollections = store.pipe(select('boardData'));
  }

  ngOnInit() {
  }

  openDialog() {
    this.store.dispatch(openBoardDialog());
  }

  openBoard(board: BoardData) {
    this.store.dispatch(activeBoardData({payload: board.data}));
    this.router.navigate(['/board', board.id]);
  }
}
