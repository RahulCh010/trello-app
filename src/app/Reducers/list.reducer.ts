import { createReducer, on } from '@ngrx/store';
import { addList, removeList, addItemInList, activeBoardData, editList, clearListState } from './../Actions/list.actions';
import { ListData } from '../Models/list.model';

const initialState: ListData[] =  [];

const listStateReducer = createReducer(initialState,
  on(addList, (listState, action) => {
    listState = [...listState, action.payload];
    return listState;
  }),
  on(clearListState, () => {
    return [];
  }),
  on(removeList, (listState, action) => {
    listState.splice(action.payload, 1);
    return listState;
  }),
  on(addItemInList, (listState, action) => {
    const index = listState.findIndex(x => x.id === action.payload.list_id);
    listState[index].list_items.push(action.payload);
    return listState;
  }),
  on(activeBoardData, (listState, action) => {
    listState = action.payload;
    return listState;
  }),
  on(editList, (listState, action) => {
    const editListIndex = listState.findIndex(x => x.id === action.payload.id);
    listState[editListIndex] = action.payload;
    return listState;
  })
);

export function listReducer(listState, action) {
  return listStateReducer(listState, action);
}
