import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BoardsComponent } from './boards.component';
import { AppState } from 'src/app/app.state';
import { openBoardDialog } from 'src/app/Actions/board.actions';
import { Store } from '@ngrx/store';
import { BoardData } from 'src/app/Models/boards.model';
import { Router } from '@angular/router';

describe('BoardsComponent', () => {
  let component: BoardsComponent;
  let fixture: ComponentFixture<BoardsComponent>;
  const initialState = [];
  let mockStore: MockStore<AppState>;
  const router = {
    navigate: jasmine.createSpy('navigate')
  };
  const board: BoardData = {
    title: Math.random().toString(36).substr(2, 9),
    id: 'Board_' + Math.random().toString(36).substr(2, 9),
    data: []
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BoardsComponent],
      imports: [
        MatCardModule,
        FormsModule,
        RouterTestingModule,
        MatDialogModule,
        BrowserAnimationsModule,
      ],
      providers: [
        provideMockStore({ initialState }),
        { provide: Router, useValue: router }
      ]
    })
      .compileComponents();
    mockStore = TestBed.get(Store);
    spyOn(mockStore, 'dispatch').and.callThrough();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch OPEN_BOARD_DIALOG action', () => {
    const expectedAction = {
      type: 'OPEN_BOARD_DIALOG'
    };
    component.openDialog();
    expect(mockStore.dispatch).toHaveBeenCalled();
    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should dispatch ACTIVE_BOARD_DATA action', () => {
    const expectedAction = {
      type: 'ACTIVE_BOARD_DATA',
      payload: board.data
    };
    component.openBoard(board);
    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
    expect(router.navigate).toHaveBeenCalledWith(['/board', board.id]);
  });
});
