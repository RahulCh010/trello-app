import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { CdkDragDrop, transferArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';

import { ListData } from './../../Models/list.model';
import { openListDialog, editListDialog } from '../../Actions/list.actions';
import { ListItems } from './../../Models/list-items.model';
import { addItemInList, removeList } from './../../Actions/list.actions';
import { removeBoardList } from './../../Actions/board.actions';
import { BoardData } from './../../Models/boards.model';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css']
})
export class BoardListComponent implements OnInit, OnDestroy {

  listCollection: ListData[];
  activeBoardData: BoardData;
  boardSubscription: Subscription;
  listSubscription: Subscription;
  itemName: string[] = [];
  activeListIndex: number;

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.getBoardData();
    this.getListData();
  }

  ngOnDestroy() {
    this.boardSubscription.unsubscribe();
    this.listSubscription.unsubscribe();
  }

  getBoardData() {
    const boardId = this.getBoardID();
    this.boardSubscription = this.store.select('boardData').subscribe(data => {
      this.activeBoardData = data.find(x => x.id === boardId);
    });
  }

  getListData() {
    this.listSubscription = this.store.select('listData').subscribe(data => {
      this.listCollection = data;
    });
  }

  openAddListDialog() {
    this.store.dispatch(openListDialog());
  }

  openEditListDialog(list: ListData) {
    this.store.dispatch(editListDialog({ payload: list }));
  }

  getBoardID() {
    const activeBoardId = this.router.url.split('/')[2];
    return activeBoardId;
  }

  addItemInList(id: string, index: number) {
    const data: ListItems = {
      name: this.itemName[index],
      list_item_id: 'listitem_' + Math.random().toString(36).substr(2, 9),
      list_id: id,
      isCompleted: false
    };
    this.store.dispatch(addItemInList({ payload: data }));
    this.itemName[index] = '';
  }

  clickListItem(listitem: ListItems) {
    listitem.isCompleted === false ? listitem.isCompleted = true : listitem.isCompleted = false;
  }

  removeList(list: ListData, index: number) {
    this.itemName[index] = '';
    this.store.dispatch(removeList({ payload: index }));
    this.store.dispatch(removeBoardList({ payload: list }));
  }

  getListIndex(index: number) {
    this.activeListIndex = index;
  }

  dropListItem(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.listCollection[this.activeListIndex].list_items,
        event.previousIndex,
        event.currentIndex);
    } else {
      const dataKey = 'list_items';
      transferArrayItem(event.previousContainer.data[dataKey],
        event.container.data[dataKey],
        event.previousIndex,
        event.currentIndex);
    }
  }
}
