import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MatDialogModule, MatIconModule, MatInputModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { BoardListComponent } from './board-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { ListItems } from 'src/app/Models/list-items.model';
import { ListData } from 'src/app/Models/list.model';
import { of } from 'rxjs';


describe('BoardListComponent', () => {
  let component: BoardListComponent;
  let fixture: ComponentFixture<BoardListComponent>;
  const initialState = [];
  let mockStore: MockStore<AppState>;
  const response: ListData[] = [];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BoardListComponent],
      imports: [
        MatCardModule,
        FormsModule,
        RouterTestingModule,
        MatDialogModule,
        DragDropModule,
        MatIconModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      providers: [
        provideMockStore({ initialState })
      ]
    })
      .compileComponents();
    mockStore = TestBed.get(Store);
    spyOn(mockStore, 'dispatch').and.callThrough();
    spyOn(mockStore, 'select').and.returnValue(of(response));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch OPEN_LIST_DIALOG action', () => {
    const expectedAction = {
      type: 'OPEN_LIST_DIALOG'
    };
    component.openAddListDialog();
    expect(mockStore.dispatch).toHaveBeenCalled();
    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should edit list', () => {
    const list = {
      board_id: 'board_sfsdfsd',
      name: 'dasdsd',
      id: 'list_svsfsd',
      list_items: []
    };
    const expectedAction = {
      type: 'EDIT_LIST_DIALOG',
      payload: list
    };
    component.openEditListDialog(list);
    expect(mockStore.dispatch).toHaveBeenCalled();
    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should set active list index', async(() => {
    const index = 1;
    component.getListIndex(index);
    expect(component.activeListIndex).toEqual(index);
  }));

  it('list item is completed', async(() => {
    const listItem: ListItems = {
      name: 'asadasd',
      list_item_id: 'listitem_' + Math.random().toString(36).substr(2, 9),
      list_id: 'list_' + Math.random().toString(36).substr(2, 9),
      isCompleted: false
    };
    component.clickListItem(listItem);
    expect(listItem.isCompleted).toBeTruthy();
  }));

  it('list item is not completed', async(() => {
    const listItem: ListItems = {
      name: 'asadasd',
      list_item_id: 'listitem_' + Math.random().toString(36).substr(2, 9),
      list_id: 'list_' + Math.random().toString(36).substr(2, 9),
      isCompleted: true
    };
    component.clickListItem(listItem);
    expect(listItem.isCompleted).toBeFalsy();
  }));

  it('should remove list', () => {
    const list: ListData = {
      board_id: 'board_adasdas',
      name: 'qweqweqw',
      id: 'list_sdfddsfs',
      list_items: []
    };
    const index = 1;
    component.itemName[index] = '';
    const expectedListAction = { type: 'REMOVE_LIST', payload: index };
    const expectedBoardAction = { type: 'REMOVE_BOARD_LIST', payload: list };
    component.removeList(list, index);
    expect(component.itemName[index]).toEqual('');
    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedListAction);
    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedBoardAction);
  });

  it('should get list collection', () => {
    component.getListData();
    expect(component.listCollection).toEqual(response);
  });
});
