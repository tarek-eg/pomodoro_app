import { combineEpics, Epic } from "redux-observable";
import { filter, ignoreElements, tap } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";

import { IRootActions, IRootState } from "../index";
import { countDownFinished } from "../actions/timerActions";

type EpicType = Epic<IRootActions, IRootActions, IRootState>;
const SAVE_TIMEOUT = 1000;
let saveTimer: number | null;

export interface SimpleTime {
  minutes: number;
  seconds: number;
  name: string;
}

export interface ICachedState {
  timeLine: SimpleTime[];
}

export const cacheSaveSettingsEpic: EpicType = (action$, state$) => {
  return action$.pipe(
    filter(isActionOf([countDownFinished])), // More?
    tap(() => {
      if (saveTimer) {
        clearTimeout(saveTimer);
      }

      const state = state$.value;
      const stateToSave: ICachedState = {
        timeLine: [...state.timer.timeLine]
      };

      saveTimer = window.setTimeout(() => {
        localStorage.setItem("cache", JSON.stringify(stateToSave));

        saveTimer = null;
      }, SAVE_TIMEOUT);
    }),
    ignoreElements()
  );
};

export const cacheEpics = combineEpics(cacheSaveSettingsEpic);
