import { ListData } from './Models/list.model';
import { BoardData } from './Models/boards.model';

export interface AppState {
    readonly listData: ListData[];
    readonly boardData: BoardData[];
}
