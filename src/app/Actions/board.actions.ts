import { createAction, props } from '@ngrx/store';
import { BoardData } from './../Models/boards.model';
import { ListData } from '../Models/list.model';

export const addBoard = createAction('ADD_NEW_BOARD', props<{payload: BoardData}>());
export const addBoardList = createAction('ADD_BOARD_LIST', props<{payload: ListData}>());
export const updateBoardList = createAction('UPDATE_BOARD_LIST', props<{payload: ListData}>());
export const removeBoard = createAction('REMOVE_BOARD', props<{payload: number}>());
export const removeBoardList = createAction('REMOVE_BOARD_LIST', props<{payload: ListData}>());
export const openBoardDialog = createAction('OPEN_BOARD_DIALOG');
export const closeBoardDialog = createAction('CLOSE_BOARD_DIALOG');
