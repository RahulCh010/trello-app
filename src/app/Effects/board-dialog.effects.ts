import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { map, exhaustMap } from 'rxjs/operators';

import { BoardDialogComponent } from './../Components/boards/board-dialog/board-dialog.component';
import { addBoard, openBoardDialog, closeBoardDialog } from './../Actions/board.actions';
import { BoardData } from '../Models/boards.model';

@Injectable()
export class BoardDialog {

    constructor(private actions: Actions, private dialog: MatDialog) { }

    openDialog = createEffect(() => this.actions.pipe(
        ofType(openBoardDialog),
        exhaustMap(dialog => {
            const dialogRef = this.dialog.open(BoardDialogComponent, {
                width: '250px',
            });
            return dialogRef.afterClosed();
        }),
        map((boardName: string) => {
            if (boardName === undefined || boardName === null) {
                return closeBoardDialog();
            }
            const data: BoardData = {
                title: boardName,
                id: 'board_' + Math.random().toString(36).substr(2, 9),
                data: [],
            };

            return addBoard({ payload: data });
        }),
    )
    );
}
