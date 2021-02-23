import { ListItems } from './list-items.model';

export interface ListData {
    board_id: string;
    name: string;
    id: string;
    list_items: ListItems[];
}
