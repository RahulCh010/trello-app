import { createReducer, on } from '@ngrx/store';
import { addBoard, removeBoard, addBoardList, updateBoardList, removeBoardList } from './../Actions/board.actions';
import { BoardData } from '../Models/boards.model';

const initialState: BoardData[] = [];

const boardStateReducer = createReducer(initialState,
  on(addBoard, (boardState, action) => {
    boardState = [...boardState, action.payload];
    return boardState;
  }),
  on(removeBoard, (boardState, action) => {
    boardState.splice(action.payload, 1);
    return boardState;
  }),
  on(addBoardList, (boardState, action) => {
    const activeBoard = boardState.find(x => x.id === action.payload.board_id);
    activeBoard.data = [...activeBoard.data, action.payload];
    return boardState;
  }),
  on(removeBoardList, (boardState, action) => {
    const activeBoard = boardState.find(x => x.id === action.payload.board_id);
    const index = activeBoard.data.findIndex(x => x.id === action.payload.id);
    if (index !== -1) {
    activeBoard.data.splice(index, 1);
    }
    return boardState;
  }),
  on(updateBoardList, (boardState, action) => {
    const activeBoard = boardState.find(x => x.id === action.payload.board_id);
    const listIndex = activeBoard.data.findIndex(x => x.id === action.payload.id);
    activeBoard.data[listIndex] = action.payload;
    return boardState;
  }),
);

export function boardReducer(boardState, action) {
  return boardStateReducer(boardState, action);
}
