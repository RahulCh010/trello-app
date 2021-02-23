import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { map, exhaustMap, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { addList, openListDialog, closeListDialog, editListDialog, editList } from './../Actions/list.actions';
import { ListDialogComponent } from '../Components/board-list/list-dialog/list-dialog.component';
import { ListData } from '../Models/list.model';
import { addBoardList, updateBoardList } from '../Actions/board.actions';

@Injectable()
export class ListDialog {

    constructor(private actions: Actions, private dialog: MatDialog, private router: Router) { }

    createListDialogEffect = createEffect(() => this.actions.pipe(
        ofType(openListDialog),
        exhaustMap(dialog => {
            const dialogRef = this.dialog.open(ListDialogComponent, {
                width: '250px',
                data: {
                    name: '',
                    option: 'create'
                }
            });
            return dialogRef.afterClosed();
        }),
        mergeMap((data) => {
            if (data === undefined || data.name === '') {
                return [closeListDialog()];
            }
            const listData: ListData = {
                board_id: this.getBoardID(),
                name: data.name,
                id: 'list_' + Math.random().toString(36).substr(2, 9),
                list_items: [],
            };
            return [
                addList({ payload: listData }),
                addBoardList({ payload: listData })
            ];
        }),
    )
    );

    editListDialogEffect = createEffect(() => this.actions.pipe(
        ofType(editListDialog),
        exhaustMap(action => {
            const dialogRef = this.dialog.open(ListDialogComponent, {
                width: '250px',
                data: {
                    name: action.payload.name,
                    option: 'edit'
                }
            });
            return dialogRef.afterClosed()
                .pipe(map((data) => ({ payload: action.payload, response: data })));
        }),
        mergeMap((data) => {
            if (data.response === undefined || data.response.name === '') {
                return [closeListDialog()];
            }
            const listData: ListData = {
                board_id: data.payload.board_id,
                name: data.response.name,
                id: data.payload.id,
                list_items: data.payload.list_items,
            };
            return [
                editList({ payload: listData }),
                updateBoardList({ payload: listData })
            ];
        }),
    )
    );

    getBoardID() {
        const activeBoardId = this.router.url.split('/')[2];
        return activeBoardId;
    }
}
