import { combineEpics, Epic } from "redux-observable";
import { interval } from "rxjs";
import { filter, mapTo, mergeMap, switchMap, takeUntil } from "rxjs/operators";
import { isOfType } from "typesafe-actions";

import { IRootActions, IRootState } from "../index";
import * as timerActions from "../actions/timerActions";
import {
  COUNT_DOWN_ONE_SECOND,
  START_TIMER,
  STOP_TIMER
} from "../actions/constants";

type EpicType = Epic<IRootActions, IRootActions, IRootState>;
const { stopTimer, countDownFinished, countDownOneSecond } = timerActions;

export const startTimerEpic: EpicType = action$ =>
  action$.pipe(
    filter(isOfType(START_TIMER)),
    switchMap(() =>
      interval(1000).pipe(
        takeUntil(action$.pipe(filter(isOfType(STOP_TIMER)))),
        mapTo(countDownOneSecond())
      )
    )
  );

export const countDownFinishedEpic: EpicType = (action$, state$) =>
  action$.pipe(
    filter(isOfType(COUNT_DOWN_ONE_SECOND)),
    filter(() => {
      const { timeLeft } = state$.value.timer;

      return timeLeft.minutes === 0 && timeLeft.seconds === 0;
    }),
    mergeMap(() => [stopTimer(), countDownFinished()])
  );

export const timerEpics = combineEpics(startTimerEpic, countDownFinishedEpic);
