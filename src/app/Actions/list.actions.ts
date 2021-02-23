import { createAction, props } from '@ngrx/store';
import { ListData } from './../Models/list.model';
import { ListItems } from './../Models/list-items.model';

export const addList = createAction('ADD_NEW_LIST', props<{payload: ListData}>());
export const clearListState = createAction('CLEAR_LIST_STATE');
export const removeList = createAction('REMOVE_LIST', props<{payload: number}>());
export const addItemInList = createAction('ADD_NEW_LIST_ITEM', props<{payload: ListItems}>());
export const activeBoardData = createAction('ACTIVE_BOARD_DATA', props<{payload: ListData[]}>());
export const editList = createAction('EDIT_LIST', props<{payload: ListData}>());
export const openListDialog = createAction('OPEN_LIST_DIALOG');
export const editListDialog = createAction('EDIT_LIST_DIALOG', props<{payload: ListData}>());
export const closeListDialog = createAction('CLOSE_LIST_DIALOG');
