import { applyMiddleware, combineReducers, createStore } from "redux";
import { combineEpics, createEpicMiddleware, Epic } from "redux-observable";
import { ActionType, StateType } from "typesafe-actions";
import { composeWithDevTools } from "redux-devtools-extension";

import { timerReducers } from "./reducers/timerReducers";
import { timerEpics } from "./epics/timerEpics";
import * as timerActions from "./actions/timerActions";

export type IRootState = StateType<typeof rootReducer>;
export type IRootActions = ActionType<typeof timerActions>;

const rootEpic: Epic = combineEpics(timerEpics);

const rootReducer = combineReducers({
  timer: timerReducers
});

export const epicMiddleware = createEpicMiddleware();

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(epicMiddleware))
);

epicMiddleware.run(rootEpic);
