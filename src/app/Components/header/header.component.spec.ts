import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterLinkWithHref, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  const initialState = [];
  let debugEl: DebugElement;
  let mockStore: MockStore<AppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        RouterTestingModule
      ],
      providers: [
        provideMockStore({ initialState }),
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    mockStore = TestBed.get(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have heading `Trello Board`', () => {
    expect(debugEl.query(By.css('.app-heading')).nativeElement.innerText).toBe('TRELLO BOARD');
  });

  it('should have href with /boards', () => {
    const linkDebugEl = debugEl.query(By.css('a'));
    const routerLinkInstance = linkDebugEl.injector.get(RouterLinkWithHref);
    expect(routerLinkInstance.href).toEqual('/boards');
  });

  it('should dispatch CLEAR_LIST_STATE action', () => {
    const expectedAction = {
      type: 'CLEAR_LIST_STATE'
    };
    spyOn(mockStore, 'dispatch');
    component.clearListState();
    expect(mockStore.dispatch).toHaveBeenCalled();
    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
  });
});
