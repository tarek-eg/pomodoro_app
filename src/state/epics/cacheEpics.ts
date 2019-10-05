import { combineEpics, Epic } from "redux-observable";
import { filter, ignoreElements, tap } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";

import { IRootActions, IRootState } from "../index";
import {
  countDownFinished,
  deletePomodoro,
  setTime
} from "../actions/timerActions";
import { MyStorage } from "../../utils/storage";
import { TimeTypes } from "../../components/pomodoroButtons";
import { Time } from "../../time";

type EpicType = Epic<IRootActions, IRootActions, IRootState>;
const SAVE_TIMEOUT = 1000;
let saveTimer: number | null;

export const storage = new MyStorage();
export interface SimpleTime {
  minutes: number;
  seconds: number;
  name: TimeTypes;
}

export interface ICachedState {
  timeLine: SimpleTime[];
  config: { [key: string]: Time } | null;
}

export const cacheSaveTimeLineEpic: EpicType = (action$, state$) => {
  return action$.pipe(
    filter(isActionOf([countDownFinished, deletePomodoro, setTime])), // More?
    tap(() => {
      if (saveTimer) {
        clearTimeout(saveTimer);
      }

      const state = state$.value;

      const stateToSave: ICachedState = {
        timeLine: [...state.timer.timeLine],
        config: state.timer.config
      };

      saveTimer = window.setTimeout(() => {
        storage.set("cache", stateToSave);

        saveTimer = null;
      }, SAVE_TIMEOUT);
    }),
    ignoreElements()
  );
};

export const cacheEpics = combineEpics(cacheSaveTimeLineEpic);
