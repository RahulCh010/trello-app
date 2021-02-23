import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardsComponent } from './Components/boards/boards.component';
import { BoardDialogComponent } from './Components/boards/board-dialog/board-dialog.component';
import { boardReducer } from './Reducers/board.reducer';
import { AppState } from './app.state';
import { listReducer } from './Reducers/list.reducer';
import { BoardListComponent } from './Components/board-list/board-list.component';
import { ListDialogComponent } from './Components/board-list/list-dialog/list-dialog.component';
import { HeaderComponent } from './Components/header/header.component';
import { EffectsModule } from '@ngrx/effects';
import { BoardDialog } from './Effects/board-dialog.effects';
import { ListDialog } from './Effects/list-dialog.effects';
import { MaterialModule } from './Material/material.module';

const reducers: ActionReducerMap<AppState> = {
  listData: listReducer,
  boardData: boardReducer
};

@NgModule({
  declarations: [
    AppComponent,
    BoardsComponent,
    BoardDialogComponent,
    BoardListComponent,
    ListDialogComponent,
    HeaderComponent,
  ],
  entryComponents: [ BoardDialogComponent, ListDialogComponent ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    DragDropModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([BoardDialog, ListDialog]),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
